import { Request, Response, NextFunction } from 'express';
import { fail } from './responses';                    // ✅ Only fail()
import { ErrorCode } from './types';                   // ✅ ErrorCode here
import { KarosError } from './errors';

function isKarosError(err: unknown): err is KarosError {
  return (
    typeof err === 'object' &&
    err !== null &&
    (err as { isKarosError?: boolean }).isKarosError === true
  );
}

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) return next(err);

  if (isKarosError(err)) {
    fail(res, err.code, err.message, err.status, err.errors);
  } else {
    fail(res, ErrorCode.INTERNAL_ERROR, 'Internal server error', 500);  // ✅ Works
  }
}
