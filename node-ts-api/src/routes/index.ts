import { Router } from "express";
import bookRouter from "./bookRoute";
import authRouter from "./authRoute";

const routes = Router();

routes.use("/book",bookRouter);
routes.use("/auth",authRouter);


export default routes;

