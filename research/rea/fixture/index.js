// Fixture original de catálogo, sem dados de terceiros ou requisições externas.
export const products = [
  { id: 'demo-1', name: 'Café da Praça', category: 'bebidas', priceCents: 850 },
  { id: 'demo-2', name: 'Caneca Aurora', category: 'casa', priceCents: 4200 },
];
export function searchProducts(query = '', category = '') {
  const normalized = query.toLocaleLowerCase('pt-BR');
  return products.filter(product => product.name.toLocaleLowerCase('pt-BR').includes(normalized)
    && (!category || product.category === category));
}
export function formatPrice(priceCents) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceCents / 100);
}
