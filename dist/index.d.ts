import { Response, Request, NextFunction } from 'express';

declare const ErrorCode: {
    readonly VALIDATION_FAILED: "VALIDATION_FAILED";
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly CONFLICT: "CONFLICT";
    readonly INTERNAL_ERROR: "INTERNAL_ERROR";
};
type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode];
interface ApiSuccessResponse<T = unknown> {
    success: true;
    data: T;
    message?: string;
    meta?: Record<string, unknown>;
}
interface ApiErrorResponse {
    success: false;
    error: {
        code: ErrorCodeType;
        message: string;
        errors?: Record<string, unknown>;
    };
}

declare function ok<T = unknown>(res: Response, data: T, message?: string, meta?: Record<string, unknown>): void;
declare function fail(res: Response, code: ErrorCodeType, message: string, status: number, errors?: Record<string, unknown>): void;

declare class KarosError extends Error {
    readonly code: ErrorCodeType;
    readonly status: number;
    readonly errors?: Record<string, unknown>;
    readonly isKarosError = true;
    constructor(code: ErrorCodeType, message: string, status: number, errors?: Record<string, unknown>);
}
declare const notFoundError: (message?: string, errors?: Record<string, unknown>) => never;
declare const validationError: (message?: string, errors?: Record<string, unknown>) => never;
declare const unauthorizedError: (message?: string, errors?: Record<string, unknown>) => never;
declare const httpError: (code: ErrorCodeType, message: string, status: number, errors?: Record<string, unknown>) => never;

declare function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void;

export { type ApiErrorResponse, type ApiSuccessResponse, ErrorCode, type ErrorCodeType, KarosError, errorHandler, fail, httpError, notFoundError, ok, unauthorizedError, validationError };
