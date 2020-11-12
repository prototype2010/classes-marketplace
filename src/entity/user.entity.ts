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

  @Column({ default: USER_ROLES.PARENT })
  role: USER_ROLES;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: false })
  isApprovedByAdmin: boolean;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: true })
  googleId: number;

  @Column({ nullable: true })
  facebookId: number;

  @Exclude()
  @Column({ nullable: false })
  emailConfirmationHash: string;
}
