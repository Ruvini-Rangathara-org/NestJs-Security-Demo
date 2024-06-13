import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import Role from '../constant/role.enum';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 15 })
  mobile: string;

  @Column({ length: 255 })
  address: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  roles: Role[];

}
