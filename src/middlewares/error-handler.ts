import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-errors.js";
import { NODE_ENV } from "../config/env.js";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ApiError) {
        const body: Record<string, unknown> = {
            success: false, 
            message: err.message,
        };  

        if (err.details) {
            body.details = err.details;
        }

        res.status(err.statusCode).json(body);
        return;
    }   


    // for cases where error is not handled by ApiError instances
    console.log("error: ", err);
    
    const body: Record<string, unknown> = {
        success: false, 
        message: "Something went wrong",
    }  

    // show stack only in dev environment
     if(NODE_ENV === "development") {
         body.details = err.stack;
     }  

     res.status(500).json(body);
     
}