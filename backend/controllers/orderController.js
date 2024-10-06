import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";

const currency = "INR";
const deliveryCharge = 10;

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const userData = await userModel.findById(userId,'email');
        const orderData = {
            userId,
            email: userData.email,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        for (const item of items) {
            await productModel.findByIdAndUpdate(item._id, {
                $inc: { quantity: -item.quantity }, 
            });
        }

        await userModel.findByIdAndUpdate(userId, {cartData:{}});
        res.json({success: true, message:'Order Placed..!'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const userData = await userModel.findById(userId,'email');
        const orderData = {
            userId,
            email: userData.email,
            items,
            address,
            amount,
            paymentMethod:'Razorpay',
            payment:false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount*100,
            currency,
            receipt: newOrder._id.toString()
        }
        await razorpayInstance.orders.create(options, (error, order) => {
            if(error){
                res.json({success: false, message: error})
            }
            res.json({success: true, order});
        });
    } catch (error) {
       res.json({success: false, message: error.message})
    }
}

const verifyPayment = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success: true, message:'Payment Successful.!'});
        } else {
            res.json({success: false, message:'Payment Failed.!'});
        }

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message})  
    }
}

const totalOrderAmount = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        let total = 0;
        orders.forEach(order => {
            total += order.amount;
        });
        res.json({success: true, total})
    } catch (error) {
        res.json({success: false, message: error.message})  
    }
}

const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message:'Order Status Updated..!'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export {
    placeOrder,
    placeOrderRazorpay,
    verifyPayment,
    allOrders,
    userOrders,
    totalOrderAmount,
    updateStatus
}