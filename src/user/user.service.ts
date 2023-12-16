import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

    /**
     * Constructor of the UserService class.
     * @param databaseService - An instance of the DatabaseService for interacting with the user database.
     */
    constructor( private readonly databaseService: DatabaseService ) {}

    /**
     * Retrieves all users from the database.
     * @returns A list of user objects.
     */
    async getAllUsers() {
        return this.databaseService.user.findMany();
    }

    /**
     * Retrieves a user by their unique identifier (ID) from the database.
     * @param id - The unique identifier of the user.
     * @returns The user object matching the provided ID.
     */
    async getUserById(id: string) {
        return this.databaseService.user.findUnique({
            where: { id: id }
        });
    }

    /**
     * Creates a new user in the database.
     * @param data - The user data to be used for creating the user.
     * @returns The newly created user object.
     */
    async createUser(data: Prisma.UserCreateInput) {
        return this.databaseService.user.create({
            data
        });
    }

    /**
     * Finds a user in the database based on their name (email).
     * @param name - The name (email) of the user to search for.
     * @returns The user object matching the provided name.
     */
    async findWithName(name: string) {
        return this.databaseService.user.findFirst({
            where: { email: name }
        });
    }
}
