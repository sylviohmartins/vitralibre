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
const token = new URLSearchParams(location.search).get('import');
const canImport = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(token ?? '') &&
  typeof BroadcastChannel === 'function';
const channel = canImport ? new BroadcastChannel('vitralibre-cadcraft-' + token) : null;
let lastUrl = null;
let lastBlob = null;

interpret.addEventListener('click', () => {
  try {
    const measures = parseSketchInstruction(instruction.value);
    form.elements.namedItem('widthMm').value = String(measures.widthMm);
    form.elements.namedItem('heightMm').value = String(measures.heightMm);
    status.textContent = 'Medidas interpretadas: ' + measures.widthMm + ' × ' + measures.heightMm + ' mm. Confira e clique em Gerar.';
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : 'Não foi possível interpretar as medidas.';
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
