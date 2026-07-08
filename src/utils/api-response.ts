import {Response} from "express";

interface ResponsePayload<T> {
    success: boolean;
    data: T;
    message?: string;
        
}

export function sendSuccess<T>(res: Response, data: T, statusCode = 200, message?: string) : void {
    const body: ResponsePayload<T> = {
        success: true,
        data,
    }

    if (message) {
        body.message = message;
    }

    res.status(statusCode).json(body);
}