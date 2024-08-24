import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// prptected routes token base
export const requireSign = async(req,res, next)=>{
    //token are inside headers.authorization not in body
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

// admin access
export const isAdmin = async(req, res, next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "unauthorized access"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
    }
}