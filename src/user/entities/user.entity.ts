import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Account } from '../../account/entities/account.entity';

@Entity({ name: 'user_information' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'firstname' })
  firstName: string;

  @Column({ name: 'lastname', nullable: true })
  lastName?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Account, account => account.user) //one user <=> multiple accounts
  accounts: Account[];
}
