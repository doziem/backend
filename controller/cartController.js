import Cart from "../model/Cart.js";

export const addToCart = async (req, res) => {
  const { userId, cartItem, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      const existingProduct = cart.products.find((product) => {
        product.cartItem.toString() === cartItem;
      });
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ cartItem, quantity });
      }

      await cart.save();

      res.status(200).json("Product added to cart");
    } else {
      const newCart = new Cart({
        userId,
        products: [{ cartItem, quantity }],
      });
      await newCart.save();

      res.status(200).json("Product added to cart");
    }
  } catch (error) {
    res.status(500).json("Error Adding Product to Cart");
  }
};

export const getCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const cart = await Cart.find({ userId }).populate(
      "products.cartItem",
      "_id title supplier price imageUrl"
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCartItem = async () => {
  const cartItemId = req.params.cartItemId;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { "products._id": cartItemId },
      { $pull: { products: { _id: cartItemId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json("Cart Item not found");
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const decrementCartItem = async (req, res) => {
  const { userId, cartItem } = req.body;

  try {
    const cart = await Cart.find({ userId });

    if (!cart) {
      return res.status(404).json("Cart not found");
    }

    const existingProduct = cart.products.find(
      (product) => product.cartItem === cartItem
    );

    if (!existingProduct) {
      return res.status(404).json("Product not found");
    }

    if (existingProduct.quantity === 1) {
      cart.products = cart.products.filter(
        (product) => product.cartItem.toString() !== cartItem
      );
    } else {
      existingProduct.quantity -= 1;
    }

    await cart.save();

    if (existingProduct.quantity === 0) {
      await Cart.updateOne({ userId }, { $pull: { products: { cartItem } } });
    }

    res.status(200).json("Product updated");
  } catch (error) {
    res.status(500).json(error);
  }
};
