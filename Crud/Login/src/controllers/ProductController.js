import { ProductModel } from '../models/ProductModel';

export const ProductController = {
  ////// Read //////
  getProducts: () => {
    return ProductModel.getAll();
  },

  ////// Create //////
  addProduct: (name, price) => {
    if (!name || isNaN(price)) {
      alert("Por favor ingrese datos válidos");
      return null;
    }
    return ProductModel.create(name, price);
  },

  ////// Update //////
  updateProduct: (id, name, price) => {
    if (!name || isNaN(price)) {
      alert("Por favor ingrese datos válidos");
      return null;
    }
    return ProductModel.update(id, name, price);
  },

  ////// Delete //////
  deleteProduct: (id) => {
    ProductModel.delete(id);
    return true;
  }
};
