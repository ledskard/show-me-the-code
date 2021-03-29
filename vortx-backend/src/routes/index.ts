import { Router } from 'express';
import callInfoRouter from "./CallInfoRouter";

const routes = Router();

routes.use("/call/info", callInfoRouter);

export default routes;
