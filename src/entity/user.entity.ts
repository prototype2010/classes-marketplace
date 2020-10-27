import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { USER_TYPES } from '../users/user.types.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: USER_TYPES;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column()
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  localBusinessId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  owner: string;

  @Column({ nullable: true })
  website: string;
}
