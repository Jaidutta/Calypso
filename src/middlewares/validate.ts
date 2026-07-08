import {Request, Response,NextFunction } from "express";
import { ZodSchema } from "zod";
import { badRequest } from "../utils/api-errors.js";

export const validate = (schema: ZodSchema) =>
    (req:Request, _res:Response, next:NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            throw badRequest("Validation Failed", result.error.issues);
        }

        // if validation is successfull 
        req.body = result.data;  //Unknown/extra fields are stripped out
                                //Any type coercions Zod applies are applied
                               //Downstream handlers get clean, safe, validated data

        
        
        next(); // calling controller with the validated data
}
  

