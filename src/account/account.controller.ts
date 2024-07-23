import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService){}

    @Get('balance/:id')
    getBalance(@Param('id') id: string) {
        return this.accountService.getBalance(+id);
    }

    @Post('transfer')
    transferFund(@Body() userDetails) {
        return this.accountService.transferFund(userDetails.from, userDetails.to, userDetails.amount);
    }
}
