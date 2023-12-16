import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from './decorator/role.decorator';
import { RoleGuard } from './guard/role.guard';

@Controller('user')
export class UserController {

    constructor( private readonly userService: UserService ) {}

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    @Role('ADMIN')
    @UseGuards(JwtGuard,RoleGuard)
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post('create')
    async createUser(@Body() createUserDto: Prisma.UserCreateInput) {
        return this.userService.createUser(createUserDto);
    }

    @Post('protected')
    @Role('USER')
    @UseGuards(JwtGuard,RoleGuard)
    async protected() {
        return 'protected';
    }
}
