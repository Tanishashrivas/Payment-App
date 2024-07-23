import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

@Module({
    imports: [UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),
        ],
    providers: [AuthService],
})
export class AuthModule {}
