export class User {
  readonly id: number;
  name: string;
  email: string;
  cpf_or_cnpj: string;
  farm_name: string;
  city: string;
  state: string;
  total_area: number;
  vegetation_area: number;
  arable_area: number;

  constructor(
    name: string,
    email: string,
    cpf_or_cnpj: string,
    farm_name: string,
    city: string,
    state: string,
    total_area: number,
    vegetation_area: number,
    arable_area: number,
  ) {
    this.name = name;
    this.email = email;
    this.cpf_or_cnpj = cpf_or_cnpj;
    this.farm_name = farm_name;
    this.city = city;
    this.state = state;
    this.total_area = total_area;
    this.vegetation_area = vegetation_area;
    this.arable_area = arable_area;
  }
}
