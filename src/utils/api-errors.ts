export class ApiError extends Error {
    readonly statusCode: number;
    readonly details?: unknown;

    constructor(status: number, message: string, details?: unknown) {
        super(message);
        this.statusCode = status;
        this.details = details;
        this.name = "ApiError";
        Error.captureStackTrace(this, this.constructor);
    }

}

export const badRequest = (message: string, details?: unknown) => new ApiError(400, message, details);
export const notFound = (message: string, details?: unknown) => new ApiError(404, message, details);
export const internalServerError = (message = "Internal Server Error") => new ApiError(500, message);
export const unauthorised = (message: string, details?: unknown) => new ApiError(401, message, details);
export const forbidden = (message: string, details?: unknown) => new ApiError(403, message, details);
export const conflict = (message: string, details?: unknown) => new ApiError(409, message, details);
