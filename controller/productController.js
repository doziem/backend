import Product from "../model/Product.js";

// Create Product
export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const saveProducts = await newProduct.save();
    res.status(201).json(saveProducts);
  } catch (error) {
    next(error);
  }
};
