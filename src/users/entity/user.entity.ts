import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { USER_TYPES } from '../user.types.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: USER_TYPES;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  localBusinessId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  owner: string;

  @Column({ nullable: true })
  website: string;
}
