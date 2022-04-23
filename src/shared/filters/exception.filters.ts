import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const error = exception.getResponse();
    const date = new Date();
    const timestamp = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    );

    response.status(status).json({
      statusCode: status,
      timestamp,
      path: request.url,
      message,
      error,
    });
  }
}
