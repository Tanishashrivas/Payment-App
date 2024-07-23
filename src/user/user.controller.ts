import { Controller, Get, Post, Patch, Body, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

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
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() userDetails: CreateUserDto) {
        return this.userService.update(+id, userDetails);
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
