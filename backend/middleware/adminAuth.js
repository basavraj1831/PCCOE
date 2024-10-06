import jwt from 'jsonwebtoken';

const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({message: 'Not Authorized'})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({message: 'Admin Authentication Failed'})
        }
        next();
    } catch (error) {
        res.status(401).json({message: error.message})
    }
};

export default adminAuth;