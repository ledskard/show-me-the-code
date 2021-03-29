import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/schemaValidator";
import * as Joi from 'joi';

export const validateCreateCallInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void | Response> => {
    const schema = Joi.object().keys({
        source: Joi.string().required().messages({
            "any.required": "o campo 'source' é obrigatório",
        }),
        destiny: Joi.string().required().messages({
            "any.required": "o campo 'destiny' é obrigatório",
        }),
        valueMinute: Joi.number().required().messages({
            "any.required": "o campo 'valueMinute' é obrigatório",
        })
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        return res.status(422).send(error);
    }
};


export const validateCalculateCallPrice = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void | Response> => {
    const schema = Joi.object().keys({
        source: Joi.string().required().messages({
            "any.required": "o campo 'source' é obrigatório",
        }),
        destiny: Joi.string().required().messages({
            "any.required": "o campo 'destiny' é obrigatório",
        }),
        plan: Joi.string().required().messages({
            "any.required": "o campo 'plan' é obrigatório",
        }),
        timeCall: Joi.number().required().messages({
            "any.required": "o campo 'timeCall' é obrigatório",
        }),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        return res.status(422).send(error);
    }
};
