import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
};

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({message:"User does not exist"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) {
            return res.json({message:"Invalid credentials"});
        }

        const token = createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        res.json({ message: error.message });    
    }
};

const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({message:"User already exists"});
        }

        if(!validator.isEmail(email)) {
            return res.json({message:"Invalid email"});
        }

        if(password.length < 8) {
            return res.json({message:"Password length should be atleast 8 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await userModel.create({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        res.json({ message: error.message });
    }
};

const getUser = async (req,res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);

        res.json({ success: true, userData }); 
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const adminLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token});
        } else {
            return res.json({message:"Invalid credentials"});
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export {
    loginUser,
    registerUser,
    getUser,
    adminLogin
};