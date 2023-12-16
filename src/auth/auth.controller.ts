import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Prisma } from '@prisma/client';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.body);
    }

    @Post('register')
    async register(@Body() createUserDto: Prisma.UserCreateInput) {
        return await this.userService.createUser(createUserDto);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refresh(@Req() request: Request) {
        return await this.authService.refresh(request);
    }
}
