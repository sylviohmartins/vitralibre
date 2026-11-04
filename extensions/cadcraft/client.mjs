const form = document.getElementById('cad-form');
const status = document.getElementById('status');
const button = document.getElementById('generate');
const result = document.getElementById('result');
const download = document.getElementById('download');
const preview = document.getElementById('preview');
let lastUrl = null;

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  button.disabled = true;
  status.textContent = 'Gerando desenho técnico…';
  result.style.display = 'none';
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
    download.href = lastUrl;
    download.download = 'desenho-tecnico.' + input.format;
    if (input.format === 'png') {
      preview.src = lastUrl;
      preview.hidden = false;
    } else {
      preview.hidden = true;
      preview.removeAttribute('src');
    }
    result.style.display = 'block';
    status.textContent = 'Desenho criado. Confira e baixe o arquivo.';
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : 'Não foi possível gerar o desenho.';
  } finally {
    button.disabled = false;
  }
});
window.addEventListener('pagehide', () => { if (lastUrl) URL.revokeObjectURL(lastUrl); });
