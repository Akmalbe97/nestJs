
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { error } from 'console';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message || "Internal server error";

    // Xatolarni loglash
    this.logger.error(`Status: ${status}, Message: ${message}`);

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
        error:exception.name || "UnknownError",
        stack: exception.stack,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
