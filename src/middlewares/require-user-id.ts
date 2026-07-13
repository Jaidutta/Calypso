import { NextFunction, Request, Response } from "express";
import { badRequest, unauthorised } from "../utils/api-errors.js";

export function requireUserId(req: Request, _res: Response, next: NextFunction) {
    const userIdHeader = req.headers['x-user-id'];

    if (!userIdHeader || Array.isArray(userIdHeader) || typeof userIdHeader !== 'string') {
        throw unauthorised('x-user-id header is required');
    }

    const userId = Number(userIdHeader);
    if (Number.isNaN(userId)) {
        throw badRequest('x-user-id header must be a valid number');
    }

    req.userId = userId;
    next();
}