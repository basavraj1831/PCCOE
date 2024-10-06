import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory,quantity, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (image) => {
            const result = await cloudinary.uploader.upload(image.path,{resource_type:'image'});
            return result.secure_url;
        }));


        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            quantity: Number(quantity),
            // sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            image: imagesUrl,
            date: Date.now(),
        }

        const product = new productModel(productData);
        await product.save();
        res.json({success: true, message: 'Product Added' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

const editProduct = async (req, res) => {
    try {
        const { productId, name, description, price, category, subCategory, quantity, bestseller } = req.body;

        const image1 = req.files && req.files.image1 && req.files.image1[0];
        const image2 = req.files && req.files.image2 && req.files.image2[0];
        const image3 = req.files && req.files.image3 && req.files.image3[0];
        const image4 = req.files && req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = [];
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (image) => {
                    const result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        }

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            quantity: Number(quantity),
            bestseller: bestseller === 'true' ? true : false,
        };

        if (imagesUrl.length > 0) {
            productData.images = imagesUrl; // Save images array
        }

        const updatedProduct = await productModel.findByIdAndUpdate(productId, productData, { new: true });
        
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'Product Updated', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success: true, products});
    } catch (error) {
        res.json({ message: error.message });
    }
};

const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json(product);
    } catch (error) {
        res.json({ message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Product Removed' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export {
    addProduct,
    editProduct,
    listProduct,
    singleProduct,
    removeProduct,
};

