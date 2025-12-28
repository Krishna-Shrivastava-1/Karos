import { Response } from 'express';
import type { ApiSuccessResponse, ApiErrorResponse, ErrorCodeType } from './types';

export function ok<T = unknown>(res: Response, data: T, message?: string, meta?: Record<string, unknown>): void {
  const response: ApiSuccessResponse<T> = { 
    success: true, 
    data, 
    ...(message && { message }),
    ...(meta && { meta })
  };
  res.status(200).json(response);  // ✅ Note: 201/204 later
}

export function fail(res: Response, code: ErrorCodeType, message: string, status: number, errors?: Record<string, unknown>): void {
  const response: ApiErrorResponse = {
    success: false,
    error: { code, message, ...(errors && { errors }) }
  };
  res.status(status).json(response);
}
