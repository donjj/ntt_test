export enum ExceptionsEnum {
  InvalidCpfOrCnpj = 'must be a valid cpf or cnpj',
  InvalidAcronymState = 'state has to be the acronym',
  InvalidareasSizes = 'The sum of arable area and vegetation must not be greater than the total area of the farm',
  UserNotFound = 'user not found',
  StateNotFound = 'state not found',
  CityNotFound = 'city not found, please check the accents',
}
