import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,

    private readonly authService: AuthService,
  ) {}

  async userSignUp(createUserDto: CreateUserDto): Promise<{token: string}> {
    const newUser = this.userRepository.create(createUserDto);
    const returnUser = await this.userRepository.save(newUser);
    const userId: number = newUser.id;

    const accUser = this.accountRepository.create({userId, balance: Math.floor(1 + Math.random() * 10000)}); //adding temporary balance for checks
    await this.accountRepository.save(accUser);

    const token = this.authService.generateToken(returnUser.email, returnUser.password);

    return token;
  }

  async userSignIn(user: Partial<User>): Promise<{token: string}> {
    const userFind = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (userFind && userFind.password === user.password) {
      const token = this.authService.generateToken(userFind.email, userFind.password);

    return token;
    } else {
      // return {message: "Invalid credentials"};
      throw new Error('Invalid credentials');
    }
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async search(filter: string) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.firstName ILIKE :filter OR user.lastName ILIKE :filter', {
        filter: `%${filter}%`,
      })
      .getMany();

      return users;
  }

  async findAll() {
    return await this.userRepository
    .createQueryBuilder('user')
    .select(['user.id', 'user.email', 'user.firstname', 'user.lastname'])
    .getMany();
  }

  async getUserAccounts() {
    return await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.accounts', 'account')
    .select(['user.email', 'account.account_id', 'account.balance'])
    .getMany();
  }
}
