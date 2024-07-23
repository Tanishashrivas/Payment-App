import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { Request } from 'express';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService){}

    @Get('balance')
    getBalance(@Req() req: Request) {
        const user = req['user'];
        return this.accountService.getBalance(user.sub);
    }

    @Post('transfer')
    transferFund(@Req() req: Request, @Body() userDetails) {
        const user = req['user'];
        return this.accountService.transferFund(user.sub, userDetails.to, userDetails.amount);
    }
}
