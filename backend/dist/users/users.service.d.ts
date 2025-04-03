import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(email: string, name: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
