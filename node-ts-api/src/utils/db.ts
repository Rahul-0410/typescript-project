import mongoose from "mongoose"

export const connectDb: ()=> Promise<void>  = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log("Connection to DB done")
    } catch (error: any) {
        console.log("error connecting: ",error.message);
        process.exit(1);
    }
};

