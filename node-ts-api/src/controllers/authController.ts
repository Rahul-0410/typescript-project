import { Response, Request } from "express"
import { IResponse } from "./bookController";
import { IUser, User } from "../models/User";
import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken"

export const signup = async(req: Request, res: Response) =>{
    const {name, email,phone,username,password,role} = req.body;

    try {
        if(!name || !email || !phone || !username || !password || !role){
            return res.status(400).json({success:false, message: "Please fill all the details", data: null} as IResponse);
        }
        let user: IUser | null;
        user = await User.findOne({email});
        if(user){
            return res.status(500).json({success:false, message: "User Already exists, Please login", data:null} as IResponse);
        }
        const securePass = await bcrypt.hash(password,10);

        user = await User.create({
            name, email,phone,username,password: securePass,role
        });

        return res.status(201).json({success: true, message: "Signup sucess", data: user} as IResponse);
 
        
    } catch (error: any) {
        return res.status(500).json({success: false, message: error.message, data: null} as IResponse);
    }
}

export const login = async (req: Request, res: Response) => {
    const {email,username,password} = req.body;
    try {
        if((!email && !username) || !password){
            return res.status(400).json({success:false, message: "Please fill all the details", data: null} as IResponse);
        }
        
        let user: IUser | null;
        user = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });
        if(!user){
            return res.status(400).json({success:false, message: "User does not exist, Please signup", data:null} as IResponse);
        }
        let comparePass= await bcrypt.compare(password,user.password);
        if(!comparePass){
            return res.status(400).json({success: false, message: "Invalid email or password",data:null} as IResponse);
        }
        const payload = {
            id: user._id,
            role: user.role
        };

        const token = jwt.sign(payload,process.env.JWT_SECRET as Secret,{
            expiresIn : "1hr",
        });

        return res.status(200).cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
        }).json({success: true, message: "Login success", data: user} as IResponse);        
    } catch (error: any) {
        return res.status(500).json({success: false, message: error.message, data: null} as IResponse);
    }
}

export const logout = async(req: Request, res: Response) =>{

    try {

        return res.status(200).cookie("token","", {
        httpOnly: true,
        expires: new Date(0)
    }).json({success:true, message: "Logout done", data: null} as IResponse);

    } catch (error: any) {
        return res.status(500).json({success: false, message: error.message, data: null} as IResponse);
    }
}

export const getCurrentUser = async (
    req: Request,
    res: Response
) => {
    try {
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            } as IResponse);
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            data: user
        } as IResponse);

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null
        } as IResponse);
    }
};

