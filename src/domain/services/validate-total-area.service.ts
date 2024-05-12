import { InvalidAreasSizesException } from '../../domain/exceptions/exceptions';

export class ValidateTotalAreaService {
  execute(
    total_area: number,
    vegetation_area: number,
    arable_area: number,
  ): void {
    if (vegetation_area + arable_area > total_area)
      throw new InvalidAreasSizesException();
  }
}
