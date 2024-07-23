import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Account } from './account/entities/account.entity';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    ssl: {
    rejectUnauthorized: false,
    },
    entities: [User, Account],
    synchronize: true,
    logging: true,
  }),
  inject: [ConfigService],
    }),
     UserModule, AccountModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(AuthMiddleware)
        .forRoutes(
          { path: 'user', method: RequestMethod.PATCH },
          { path: 'account/balance', method: RequestMethod.GET },
          { path: 'account/transfer', method: RequestMethod.POST },
      )
  }
}
