import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

    constructor( private readonly databaseService: DatabaseService ) {}

    async getAllUsers() {
        return this.databaseService.user.findMany();
    }

    async getUserById(id: string) {
        return this.databaseService.user.findUnique({
            where: { id: id }
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        return this.databaseService.user.create({
            data
        });
    }

    async findWithName(name: string) {
        return this.databaseService.user.findFirst({
            where: { email: name }
        });
    }
}
