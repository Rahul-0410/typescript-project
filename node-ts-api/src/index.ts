import express, {Express, Request, Response} from "express"
import {config} from "dotenv"
import cors from "cors"
import { connectDb } from "./utils/db";
import routes from "./routes";

const app: Express = express();
config()
const port = process.env.PORT || 8080;

//middleware
app.use(cors({
    origin: process.env.HOST_URL,
    credentials: true
}));

app.use(express.json());

//db
connectDb();

app.use("/api",routes);

app.get("/",(req: Request,res: Response)=>{
    // res.send("Hello world");
    res.json({success: true, message: "hello"});
});


app.listen(port,()=>console.log(`Server running on port ${port}`));