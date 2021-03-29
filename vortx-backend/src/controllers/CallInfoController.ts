import { Request, Response } from "express";
import { ProcessError } from "../utils/processError";
import CallInfoService from "../services/CallInfoService";

export default class CallInfoController {

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const callInfoService = new CallInfoService();
            const callInfo = await callInfoService.create(req.body);
            return res.status(200).json(callInfo);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async populate(req: Request, res: Response): Promise<Response> {
        try {
            const callInfoService = new CallInfoService();
            const callInfo = await callInfoService.populate();
            return res.status(200).json(callInfo);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async calculateCallPrice(req: Request, res: Response): Promise<Response> {
        try {
            const callInfoService = new CallInfoService();
            const callInfo = await callInfoService.calculateCallPrice(req.body);
            return res.status(200).json(callInfo);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

}
