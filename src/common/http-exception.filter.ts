import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal Server Error';
    let error = 'InternalError';
    let details: unknown;
    if (exception instanceof HttpException) {
      const payload = exception.getResponse();
      if (typeof payload === 'string') {
        message = payload;
      } else if (payload && typeof payload === 'object') {
        const p = payload as Record<string, unknown>;
        const m = p.message;
        if (typeof m === 'string') {
          message = m;
        } else if (Array.isArray(m)) {
          message = m as string[];
        } else {
          message = exception.message;
        }
        const e = p.error;
        if (typeof e === 'string') {
          error = e;
        } else {
          error = exception.name;
        }
        const detailsCandidate = p['details'];
        if (detailsCandidate !== undefined) details = detailsCandidate;
      } else {
        message = exception.message;
        error = exception.name;
      }
    }
    res.status(status).json({
      code: status,
      message: Array.isArray(message) ? message.join(', ') : String(message),
      error,
      details,
      timestamp: new Date().toISOString(),
    });
  }
}
