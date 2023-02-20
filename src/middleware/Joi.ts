import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { ICustomer } from '../models/Cusomer';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schema = {
    customer: {
        create: Joi.object<ICustomer>({
            name: Joi.string().required(),
            surname: Joi.string().required(),
            email: Joi.string().required(),
            city: Joi.string().required(),
            dateOfBirth: Joi.string().required()
        })
    }
};
