import { HttpStatus, NotFoundException } from '@nestjs/common';

const errorMessage = (resource: string) => {
  return {
    statusCode: HttpStatus.NOT_FOUND,
    message: `Resource ${resource} not found`,
    error: 'Not Found Exception',
  };
};

export class NotFound extends NotFoundException {
  constructor(private resource: string) {
    super(errorMessage(resource));
  }
}
