import { Request, Response, NextFunction } from "express";
import { notFound } from "../utils/api-errors.js";

export function routeNotFound(req: Request, _res: Response, next: NextFunction) {
    next(notFound(`Route not found: ${req.method} ${req.path}`))
    
}