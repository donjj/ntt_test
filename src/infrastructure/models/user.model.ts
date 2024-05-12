import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'public' })
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf_or_cnpj: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  farm_name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  total_area: number;

  @Column()
  vegetation_area: number;

  @Column()
  arable_area: number;
}
