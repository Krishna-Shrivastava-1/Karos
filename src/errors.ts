import { ErrorCodeType } from './types';

export class KarosError extends Error {
  public readonly code: ErrorCodeType;
  public readonly status: number;
  public readonly errors?: Record<string, unknown>;
  public readonly isKarosError = true;

  constructor(code: ErrorCodeType, message: string, status: number, errors?: Record<string, unknown>) {
    super(message);
    this.code = code;
    this.status = status;
    this.errors = errors;
    
    // ✅ Professional stack trace fix
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, KarosError);
    }
  }
}

// ✅ PREBUILT HELPERS (ChatGPT point)
export const notFoundError = (message: string = 'Not found', errors?: Record<string, unknown>): never => {
  throw new KarosError('NOT_FOUND', message, 404, errors);
};

export const validationError = (message: string = 'Validation failed', errors?: Record<string, unknown>): never => {
  throw new KarosError('VALIDATION_FAILED', message, 400, errors);
};

export const unauthorizedError = (message: string = 'Unauthorized', errors?: Record<string, unknown>): never => {
  throw new KarosError('UNAUTHORIZED', message, 401, errors);
};

export const httpError = (code: ErrorCodeType, message: string, status: number, errors?: Record<string, unknown>): never => {
  throw new KarosError(code, message, status, errors);
};
