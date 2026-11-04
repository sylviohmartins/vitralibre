/**
 * Interpretador local e determinístico para um único desenho retangular.
 * Não é um LLM, não executa comandos livres nem lê arquivos de terceiros.
 */
export function parseSketchInstruction(instruction) {
  if (typeof instruction !== 'string' || !instruction.trim() || instruction.length > 180) {
    throw new Error('Descreva um retângulo de até 180 caracteres com medidas e unidade.');
  }
  const normalized = instruction.trim().toLocaleLowerCase('pt-BR')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ').replace(/\.$/, '').trim();
  const expression = /^(?:(?:desenhe|desenha|crie|cria|gere|gera|faca|desenhar|criar)\s+)?(?:(?:um|uma)\s+)?(?:(?:retangulo|comodo|painel|tampo|produto|peca|placa|esboco|desenho)(?:\s+retangular)?\s+)?(?:(?:de|com)\s+)?(\d+(?:[.,]\d{1,3})?)\s*(?:x|×|por)\s*(\d+(?:[.,]\d{1,3})?)\s*(milimetros?|mm|centimetros?|cm|metros?|m)$/;
  const match = normalized.match(expression);
  if (!match) {
    throw new Error('Use um formato como: "Desenhe um painel de 60 x 40 cm". Só retângulos com unidades explícitas são aceitos.');
  }
  const multiplier = /^m(?:etro[s]?)?$/.test(match[3]) ? 1000 :
    /^(?:cm|centimetros?)$/.test(match[3]) ? 10 : 1;
  const toMm = value => {
    const converted = Number(value.replace(',', '.')) * multiplier;
    const rounded = Math.round(converted);
    if (!Number.isSafeInteger(rounded) || rounded < 1 || rounded > 10000 ||
        Math.abs(converted - rounded) > 1e-8) {
      throw new Error('As medidas precisam representar milímetros inteiros entre 1 e 10.000 mm.');
    }
    return rounded;
  };
  return { widthMm: toMm(match[1]), heightMm: toMm(match[2]) };
}
