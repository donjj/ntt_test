import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionsEnum } from '../enums/exceptions.enum';

export class InvalidCpfOrCnpjException extends HttpException {
  constructor() {
    super(ExceptionsEnum.InvalidCpfOrCnpj, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidAcronymStateException extends HttpException {
  constructor() {
    super(ExceptionsEnum.InvalidAcronymState, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidAreasSizesException extends HttpException {
  constructor() {
    super(ExceptionsEnum.InvalidareasSizes, HttpStatus.BAD_REQUEST);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super(ExceptionsEnum.UserNotFound, HttpStatus.NOT_FOUND);
  }
}

export class StateNotFoundException extends HttpException {
  constructor() {
    super(ExceptionsEnum.StateNotFound, HttpStatus.NOT_FOUND);
  }
}

export class CityNotFoundException extends HttpException {
  constructor() {
    super(ExceptionsEnum.CityNotFound, HttpStatus.NOT_FOUND);
  }
}
