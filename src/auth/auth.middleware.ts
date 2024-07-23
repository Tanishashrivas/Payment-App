import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
  ) {}
  
    async use(req: Request, res: Response, next: NextFunction) {
       const token = req.headers.authorization;

       
       if(!token){
        throw new UnauthorizedException("Token doesn't exist");
      }
      
      const jwtToken = token.split(' ')[1];
        
        try {
          console.log(jwtToken);
          const decoded = await this.jwtService.verifyAsync(jwtToken);
          console.log(decoded);
          req['user'] = decoded;
          console.log("Middleware is running", req['user']);
         next();
       } catch (err) {
        console.log(err);
         throw new UnauthorizedException('Invalid token');
       }
    }
}