import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    const product = await productModel.findById(itemId);
    const availabeQuantity = product.quantity;

        if (cartData[itemId] >= availabeQuantity) {
            res.json({ success: false, message: "Quantity Exceeded" });
            return;
        }

    if (cartData[itemId]) {
      cartData[itemId] +=1;
    } else {
      cartData[itemId] = {};
      cartData[itemId] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;
        
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        const product = await productModel.findById(itemId);
        const availabeQuantity = product.quantity;

        if (quantity > availabeQuantity) {
            res.json({ success: false, message: "Quantity Exceeded" });
            return; 
        }

        cartData[itemId] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({ success: true, cartData }); 
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
