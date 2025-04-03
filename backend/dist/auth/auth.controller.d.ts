import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { RegisterDto } from './register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(authDto: AuthDto): Promise<{
        access_token: string;
        name: string;
    } | {
        message: string;
    }>;
    register(registerDto: RegisterDto): Promise<import("../users/user.entity").User>;
}
