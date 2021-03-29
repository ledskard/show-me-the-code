import { Router } from "express";
import CallInfoController from "../controllers/CallInfoController";
import { validateCalculateCallPrice, validateCreateCallInfo } from "../schemas/CallInfoSchema";

const callInfoRouter = Router();
const callInfoController = new CallInfoController();

callInfoRouter.post("/", validateCreateCallInfo, callInfoController.create);
callInfoRouter.post("/calculate", validateCalculateCallPrice, callInfoController.calculateCallPrice);
callInfoRouter.post("/populate", callInfoController.populate);

export default callInfoRouter;
