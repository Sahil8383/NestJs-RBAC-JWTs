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

    async validateUser(username: string, pass?: string) {
        const user = await this.userService.findWithName(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

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
