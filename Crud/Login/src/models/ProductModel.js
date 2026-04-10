let products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mouse", price: 20 }
];
let nextId = 3;

export const ProductModel = {
  ////// Read //////
  getAll: () => {
    return [...products];
  },
  
  ////// Create //////
  create: (name, price) => {
    const newProduct = { id: nextId++, name, price: Number(price) };
    products = [...products, newProduct];
    return newProduct;
  },
  
  ////// Update //////
  update: (id, name, price) => {
    products = products.map(product => 
      product.id === id ? { ...product, name, price: Number(price) } : product
    );
    return products.find(p => p.id === id);
  },
  
  ////// Delete //////
  delete: (id) => {
    products = products.filter(product => product.id !== id);
  }
};
