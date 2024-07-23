import { Controller, Get, Post, Patch, Body, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('signup')
    userSignUp(@Body() userDetails: CreateUserDto) {
        return this.userService.userSignUp(userDetails);
    }

    @Post('signin')
    userSignIn(@Body() userDetails: CreateUserDto) {
        return this.userService.userSignIn(userDetails);
    }
    
    @Patch()
    update(@Req() req: Request, @Body() userDetails: CreateUserDto) {
        const user = req['user'];
        return this.userService.update(user.sub, userDetails);
    }

    @Get('bulk')
    search(@Query('filter') filter: string) {
        return this.userService.search(filter);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get('accounts')
    getUserAccounts() {
        return this.userService.getUserAccounts(); 
    }
}
