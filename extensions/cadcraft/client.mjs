import { parseSketchInstruction } from './intent.mjs';

const form = document.getElementById('cad-form');
const status = document.getElementById('status');
const button = document.getElementById('generate');
const result = document.getElementById('result');
const download = document.getElementById('download');
const preview = document.getElementById('preview');
const apply = document.getElementById('apply');
const applyHint = document.getElementById('apply-hint');
const instruction = document.getElementById('instruction');
const interpret = document.getElementById('interpret');
const planButton = document.getElementById('plan-ai');
fetch('/api/cadcraft/health', { cache: 'no-store' })
  .then(response => response.ok ? response.json() : null)
  .then(info => { planButton.hidden = info?.aiPlannerEnabled !== true; })
  .catch(() => { planButton.hidden = true; });
const token = new URLSearchParams(location.search).get('import');
const canImport = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(token ?? '') &&
  typeof BroadcastChannel === 'function';
const channel = canImport ? new BroadcastChannel('vitralibre-cadcraft-' + token) : null;
let lastUrl = null;
let lastBlob = null;
const gridSummary = document.getElementById('grid-summary');
const gridControls = ['widthMm', 'heightMm', 'verticalDividers', 'horizontalDividers'];
function updateGridSummary() {
  const width = Number(form.elements.namedItem('widthMm').value);
  const height = Number(form.elements.namedItem('heightMm').value);
  const vertical = Number(form.elements.namedItem('verticalDividers').value);
  const horizontal = Number(form.elements.namedItem('horizontalDividers').value);
  if (![width, height, vertical, horizontal].every(Number.isFinite) ||
      ![width, height, vertical, horizontal].every(Number.isInteger) ||
      width < 1 || height < 1 || vertical < 0 || horizontal < 0 ||
      vertical > 8 || horizontal > 8 || width > 10000 || height > 10000) {
    gridSummary.textContent = 'Informe medidas inteiras válidas para calcular os compartimentos.';
    return;
  }
  const eachWidth = width / (vertical + 1);
  const eachHeight = height / (horizontal + 1);
  if ((vertical > 0 && eachWidth < 25) || (horizontal > 0 && eachHeight < 25)) {
    gridSummary.textContent = 'Cada compartimento precisa medir pelo menos 25 mm em cada dimensão.';
    return;
  }
  const count = (vertical + 1) * (horizontal + 1);
  gridSummary.textContent = count === 1
    ? 'Sem divisórias: uma área retangular.'
    : count + ' compartimentos de aproximadamente ' + eachWidth.toFixed(1) +
      ' × ' + eachHeight.toFixed(1) + ' mm (medidas internas nominais).';
}
for (const name of gridControls)
  form.elements.namedItem(name).addEventListener('input', updateGridSummary);
updateGridSummary();

interpret.addEventListener('click', () => {
  try {
    const measures = parseSketchInstruction(instruction.value);
    form.elements.namedItem('widthMm').value = String(measures.widthMm);
    form.elements.namedItem('heightMm').value = String(measures.heightMm);
    updateGridSummary();
    status.textContent = 'Medidas interpretadas: ' + measures.widthMm + ' × ' + measures.heightMm + ' mm. Confira e clique em Gerar.';
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : 'Não foi possível interpretar as medidas.';
  }
});

planButton.addEventListener('click', async () => {
  if (planButton.hidden) return;
  planButton.disabled = true;
  status.textContent = 'Consultando IA para planejar o retângulo…';
  try {
    const response = await fetch('/api/cadcraft/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-VitraLibre-CAD': '1' },
      body: JSON.stringify({ instruction: instruction.value }),
      cache: 'no-store'
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'Não foi possível planejar o desenho.');
    if (payload.shape !== 'rectangle' || payload.requiresConfirmation !== true ||
        ![payload.widthMm, payload.heightMm].every(n => Number.isSafeInteger(n) && n >= 1 && n <= 10000))
      throw new Error('Plano retornado fora das restrições do desenho.');
    form.elements.namedItem('widthMm').value = String(payload.widthMm);
    form.elements.namedItem('heightMm').value = String(payload.heightMm);
    updateGridSummary();
    status.textContent = 'Plano proposto pela IA: ' + payload.widthMm + ' × ' + payload.heightMm +
      ' mm. Confira as medidas. Nenhum desenho foi executado; clique em Gerar para confirmar.';
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : 'Erro ao consultar IA.';
  } finally {
    planButton.disabled = false;
  }
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  button.disabled = true;
  status.textContent = 'Gerando desenho técnico…';
  result.style.display = 'none';
  apply.hidden = true;
  applyHint.hidden = true;
  lastBlob = null;
  try {
    const input = {
      widthMm: Number(form.elements.namedItem('widthMm').value),
      heightMm: Number(form.elements.namedItem('heightMm').value),
      format: form.elements.namedItem('format').value
    };
    const verticalDividers = Number(form.elements.namedItem('verticalDividers').value);
    const horizontalDividers = Number(form.elements.namedItem('horizontalDividers').value);
    if (verticalDividers > 0) input.verticalDividers = verticalDividers;
    if (horizontalDividers > 0) input.horizontalDividers = horizontalDividers;
    const response = await fetch('/api/cadcraft/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-VitraLibre-CAD': '1' },
      body: JSON.stringify(input),
      cache: 'no-store'
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Falha ao gerar arquivo.');
    }
    const contentType = input.format === 'png' ? 'image/png' : 'application/dxf';
    const blob = await response.blob();
    if (blob.size === 0 || blob.type !== contentType) throw new Error('O formato retornado não corresponde ao solicitado.');
    if (lastUrl) URL.revokeObjectURL(lastUrl);
    lastUrl = URL.createObjectURL(blob);
    lastBlob = blob;
    download.href = lastUrl;
    download.download = 'desenho-tecnico.' + input.format;
    if (input.format === 'png') {
      preview.src = lastUrl;
      preview.hidden = false;
      if (channel) {
        apply.hidden = blob.size > 1024 * 1024 || blob.size < 32;
        applyHint.hidden = apply.hidden;
        if (apply.hidden) status.textContent = 'PNG gerado, mas excede 1 MB ou é inválido para o catálogo. Baixe o arquivo.';
      }
    } else {
      preview.hidden = true;
      preview.removeAttribute('src');
    }
    result.style.display = 'block';
    if (!status.textContent.includes('excede 1 MB')) status.textContent = 'Desenho criado. Confira e baixe o arquivo ou aplique ao produto.';
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : 'Não foi possível gerar o desenho.';
  } finally {
    button.disabled = false;
  }
});

apply.addEventListener('click', () => {
  if (!channel || !lastBlob || lastBlob.type !== 'image/png' ||
      lastBlob.size > 1024 * 1024 || lastBlob.size < 32) return;
  channel.postMessage({ type: 'vitralibre-cadcraft-png', nonce: token, blob: lastBlob });
  status.textContent = 'Imagem enviada ao editor. Confira a prévia do produto e clique em Salvar produto.';
});

if (channel) {
  channel.onmessage = event => {
    if (event.data?.type === 'vitralibre-cadcraft-applied' && event.data.nonce === token) {
      status.textContent = 'Imagem aplicada na prévia do produto. Volte ao editor e confirme em Salvar produto.';
      apply.hidden = true;
    }
  };
}
window.addEventListener('pagehide', () => {
  if (lastUrl) URL.revokeObjectURL(lastUrl);
  channel?.close();
});
