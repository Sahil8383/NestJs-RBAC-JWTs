import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    /**
     * Validates a user by checking if the provided username and password match the stored credentials.
     * @param username - The username to validate.
     * @param pass - The password to validate (optional).
     * @returns A user object if validation is successful, or null otherwise.
     */
    async validateUser(username: string, pass?: string) {
        const user = await this.userService.findWithName(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * Handles the user login process, generates JWT tokens, and returns them.
     * @param user - The user object containing login details.
     * @returns An object with user details, access token, and refresh token.
     */
    async login(user: any){

        const userDB = await this.userService.findWithName(user.name);

        const payload = {
            username: user.email,
            sub:{
                name: userDB.name,
                role: userDB.role,
            }
        }
        
        return {
            ...user,
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, {expiresIn: '7d'}),
        };
    }

    /**
     * Handles the token refresh process and returns a new access token.
     * @param user - The user object containing necessary details for token refresh.
     * @returns An object with a new access token.
     */
    async refresh(user: any){
        const payload = {
            username: user.email,
            sub:{
                name: user.name,
            }
        }

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
