import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
      ) {}
      
        async generateToken(username: string, password: string):  Promise<{ token: string }>  {
            const user = await this.userRepository.findOne({ where: { email: username } });
    
            if(!user || user.password !== password){
                throw new UnauthorizedException;
            }
    
            const payload = { sub: user.id, username: user.email };
    
            return { token: await this.jwtService.signAsync(payload) };
        }
}
