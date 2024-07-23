import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AccountModule],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
