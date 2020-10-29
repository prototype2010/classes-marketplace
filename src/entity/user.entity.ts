import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum USER_ROLES {
  BUSINESS = 'business',
  PARENT = 'parent',
  ADMIN = 'admin',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: USER_ROLES.PARENT })
  role: USER_ROLES;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, default: false })
  isApprovedByAdmin: boolean;

  @Column({ nullable: false, default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: false })
  emailConfirmationHash: string;
}
