import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async getBalance(id: number): Promise<Account> {
    return await this.accountRepository.findOne({ where: { userId: id } });
  }

  async transferFund(from: number, to: number, amount: number): Promise<Account> {
    const fromAccount = await this.accountRepository.findOne({
      where: { userId: from },
    });

    const toAccount = await this.accountRepository.findOne({
      where: { userId: to },
    });

    console.log('From account:', fromAccount);
    console.log('To account:', toAccount);

    if (!fromAccount || amount > fromAccount.balance) {
            throw new Error('Insufficient balance');
    }

    if (!toAccount) {
        throw new Error('Invalid account details');
    }

    
    await this.accountRepository.
    createQueryBuilder()
    .update()
    .set({ balance: () => `balance + ${amount}`})
    .where("user_id = :to", { to })
    .execute();

    await this.accountRepository.
    createQueryBuilder()
    .update()
    .set({ balance: () => `balance - ${amount}`})
    .where("user_id = :from", { from })
    .execute();

    return this.accountRepository.findOne({ where: { userId: from }});
  }
}
