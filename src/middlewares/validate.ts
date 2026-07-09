import {Request, Response,NextFunction } from "express";
import { ZodSchema } from "zod";
import { badRequest } from "../utils/api-errors.js";

/*

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
  
*/


type Source = "body" | "params" | "query";

const validateSource = (schema: ZodSchema, source: Source) =>
    (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[source]);
        if (!result.success) throw badRequest("Validation Failed", result.error.issues);
        if (source === "body") {
            req.body = result.data; // no cast needed for body
        } else {
            (req[source] as any) = result.data; // cast only for params/query
        }
        next();
    };

export const validateBody = (schema: ZodSchema) => validateSource(schema, "body");
export const validateParams = (schema: ZodSchema) => validateSource(schema, "params");
export const validateQuery = (schema: ZodSchema) => validateSource(schema, "query");
