"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ErrorCode: () => ErrorCode,
  KarosError: () => KarosError,
  errorHandler: () => errorHandler,
  fail: () => fail,
  httpError: () => httpError,
  notFoundError: () => notFoundError,
  ok: () => ok,
  unauthorizedError: () => unauthorizedError,
  validationError: () => validationError
});
module.exports = __toCommonJS(index_exports);

// src/types.ts
var ErrorCode = {
  VALIDATION_FAILED: "VALIDATION_FAILED",
  UNAUTHORIZED: "UNAUTHORIZED",
  NOT_FOUND: "NOT_FOUND",
  FORBIDDEN: "FORBIDDEN",
  CONFLICT: "CONFLICT",
  INTERNAL_ERROR: "INTERNAL_ERROR"
};

// src/responses.ts
function ok(res, data, message, meta) {
  const response = {
    success: true,
    data,
    ...message && { message },
    ...meta && { meta }
  };
  res.status(200).json(response);
}
function fail(res, code, message, status, errors) {
  const response = {
    success: false,
    error: { code, message, ...errors && { errors } }
  };
  res.status(status).json(response);
}

// src/errors.ts
var KarosError = class _KarosError extends Error {
  constructor(code, message, status, errors) {
    super(message);
    this.isKarosError = true;
    this.code = code;
    this.status = status;
    this.errors = errors;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _KarosError);
    }
  }
};
var notFoundError = (message = "Not found", errors) => {
  throw new KarosError("NOT_FOUND", message, 404, errors);
};
var validationError = (message = "Validation failed", errors) => {
  throw new KarosError("VALIDATION_FAILED", message, 400, errors);
};
var unauthorizedError = (message = "Unauthorized", errors) => {
  throw new KarosError("UNAUTHORIZED", message, 401, errors);
};
var httpError = (code, message, status, errors) => {
  throw new KarosError(code, message, status, errors);
};

// src/middleware.ts
function isKarosError(err) {
  return typeof err === "object" && err !== null && err.isKarosError === true;
}
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  if (isKarosError(err)) {
    fail(res, err.code, err.message, err.status, err.errors);
  } else {
    fail(res, ErrorCode.INTERNAL_ERROR, "Internal server error", 500);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorCode,
  KarosError,
  errorHandler,
  fail,
  httpError,
  notFoundError,
  ok,
  unauthorizedError,
  validationError
});
