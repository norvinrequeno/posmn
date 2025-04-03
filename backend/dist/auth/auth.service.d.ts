import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { User } from 'src/users/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateService(email: string, password: string): Promise<User | null>;
    login(user: User): {
        access_token: string;
        name: string;
    };
    register(email: string, name: string, password: string): Promise<User>;
}
