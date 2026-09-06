import { Request, response, Response } from "express";
import { Book } from "../models/Book";
import { ROLES } from '../utils/role';

export interface IResponse {
    success: boolean,
    message: string,
    data?: any
}

//STATUS code
//1xx: Information
//2xx: success
//3xx : redirectional
//4xx : client side
//5xx : server side

export const getBooks = async (req: Request,res: Response)=>{

    try {
        const books = await Book.find();
        if(!books){
            return res.status(404).json({success:false, message:"Not found"} as IResponse)
        }
        return res.status(200).json({success: true, message: "Book found",
            data: books
        } as IResponse)
    } catch (error) {
        return res.status(500).json({success: false, message: "internal server error"} as IResponse)

    }
}

export const addBook = async(req: Request, res: Response) =>{

    if(req.role !== ROLES.creator && req.role !== ROLES.admin){
        return res.status(400).json({success: false, message: "You are not eligible"} as IResponse);
    }
    //req.body
    const {name,author,publishYear, description} = req.body;


    try {
        const book = await Book.create({
            author,
            description,
            name,
            publishYear
        })
        return res.status(201).json({success: true, message: "book created", data: book} as IResponse)
        
    } catch (error: any) {
        return res.status(500).json({success:false, message: error.message} as IResponse)
    }

}

export const updateBook = async (req: Request, res: Response) => {
    //paramater
    //req.params.id
     if(req.role !== ROLES.creator && req.role !== ROLES.admin){
        return res.status(400).json({success: false, message: "You are not eligible"} as IResponse);
    }
    const {id} = req.params;
    const {name,author, publishYear, description} = req.body;
    try {
        const book = await Book.findByIdAndUpdate(id,{
            name,
            author,
            publishYear,
            description
        }, {new: true});
        if(!book){
            return res.status(404).json({success:false, message:"Not found"} as IResponse)
        }

        return res.status(200).json({success:true, message:"Book updated", data: book} as IResponse)
        
    } catch (error: any) {
        return res.status(500).json({success:false, message: error.message} as IResponse)
    }
}
export const deleteBook = async (req: Request, res: Response) => {
    //paramater
    //req.params.id
     if(req.role !== ROLES.creator && req.role !== ROLES.admin){
        return res.status(400).json({success: false, message: "You are not eligible"} as IResponse);
    }
    const {id} = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({success:false, message:"Not found"} as IResponse)
        }

        return res.status(200).json({success:true, message:"Book deleted"} as IResponse)
        
    } catch (error: any) {
        return res.status(500).json({success:false, message: error.message} as IResponse)
    }
}

