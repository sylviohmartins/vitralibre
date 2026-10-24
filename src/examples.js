/** Original, fictional catalogs. A fresh clone is returned on every call. */
const restaurant = {
 version:1,id:'casa-flora',name:'Casa Flora',description:'Comida de verdade. Feita com tempo, afeto e ingredientes da estação.',segment:'restaurant',theme:'forest',logo:'',publicUrl:'',
 categories:[{id:'pratos',name:'Pratos principais'},{id:'leves',name:'Saladas & leves'},{id:'doces',name:'Doces da casa'},{id:'bebidas',name:'Bebidas'},{id:'vegetarianos',name:'Vegetarianos',parentId:'pratos'}],
 products:[
 {id:'p1',name:'Bowl da estação',description:'Arroz integral, legumes assados, abacate e nosso molho de ervas.',categoryId:'vegetarianos',priceCents:3200,available:true,image:'./assets/meal.svg',variants:[{name:'Com tofu grelhado',priceCents:3800}]},
 {id:'p2',name:'Salada do jardim',description:'Folhas frescas, tomates, rabanete e um delicado molho cítrico.',categoryId:'leves',priceCents:2600,available:true,image:'./assets/salad.svg',variants:[{name:'Porção para compartilhar',priceCents:4200}]},
 {id:'p3',name:'Bolo de chocolate',description:'Massa úmida, ganache de chocolate e frutas vermelhas.',categoryId:'doces',priceCents:1800,available:true,image:'./assets/dessert.svg',variants:[]},
 {id:'p4',name:'Limonada da casa',description:'Limão fresco, hortelã e um toque de gengibre. 350 ml.',categoryId:'bebidas',priceCents:1200,available:true,image:'./assets/drink.svg',variants:[{name:'Jarra · 1 litro',priceCents:2800}]},
 {id:'p5',name:'Bowl de raízes',description:'Grãos, batata-doce e vegetais dourados com tahine.',categoryId:'vegetarianos',priceCents:3400,available:true,image:'./assets/meal.svg',variants:[]},
 {id:'p6',name:'Salada mediterrânea',description:'Pepino, folhas, grão-de-bico e azeite aromático.',categoryId:'leves',priceCents:2800,available:false,image:'./assets/salad.svg',variants:[]},
 {id:'p7',name:'Brownie com frutas',description:'Chocolate intenso com uma generosa porção de frutas.',categoryId:'doces',priceCents:1600,available:true,image:'./assets/dessert.svg',variants:[]},
 {id:'p8',name:'Chá gelado de limão',description:'Infusão da casa com limão e hortelã, sem açúcar. 350 ml.',categoryId:'bebidas',priceCents:1000,available:true,image:'./assets/drink.svg',variants:[]}
 ]};
const retail={version:1,id:'forma-studio',name:'Forma Studio',description:'Objetos para morar bem. Design simples, materiais naturais e escolhas com intenção.',segment:'retail',theme:'terracotta',logo:'',publicUrl:'',categories:[{id:'objetos',name:'Objetos'},{id:'luz',name:'Iluminação'},{id:'moveis',name:'Mobiliário'},{id:'acessorios',name:'Acessórios'},{id:'ceramica',name:'Cerâmica',parentId:'objetos'}],products:[
 {id:'r1',name:'Bolsa horizonte',description:'Algodão encorpado, alças confortáveis e espaço para o dia a dia.',categoryId:'acessorios',priceCents:12900,available:true,image:'./assets/bag.svg',variants:[{name:'Caramelo',priceCents:12900}]},
 {id:'r2',name:'Vaso areia',description:'Cerâmica de formas orgânicas, finalizada à mão. 24 cm.',categoryId:'ceramica',priceCents:8900,available:true,image:'./assets/vase.svg',variants:[{name:'Grande · 32 cm',priceCents:12900}]},
 {id:'r3',name:'Luminária arco',description:'Luz suave e uma presença leve para o seu canto favorito.',categoryId:'luz',priceCents:24900,available:true,image:'./assets/lamp.svg',variants:[]},
 {id:'r4',name:'Cadeira encontro',description:'Madeira clara e linhas acolhedoras para reunir.',categoryId:'moveis',priceCents:59000,available:true,image:'./assets/chair.svg',variants:[]},
 {id:'r5',name:'Bolsa cotidiano',description:'Uma companheira versátil em lona natural.',categoryId:'acessorios',priceCents:9900,available:true,image:'./assets/bag.svg',variants:[]},
 {id:'r6',name:'Vaso terracota',description:'Textura natural e presença escultural em cada detalhe.',categoryId:'ceramica',priceCents:11900,available:false,image:'./assets/vase.svg',variants:[]},
 {id:'r7',name:'Luminária serena',description:'Iluminação delicada para a mesa de leitura.',categoryId:'luz',priceCents:21900,available:true,image:'./assets/lamp.svg',variants:[]},
 {id:'r8',name:'Cadeira pausa',description:'Um convite para desacelerar, em madeira de reflorestamento.',categoryId:'moveis',priceCents:64000,available:true,image:'./assets/chair.svg',variants:[]}
]};
export function getExample(segment='restaurant'){return structuredClone(segment==='retail'?retail:restaurant);}
