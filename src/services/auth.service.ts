import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { UserModel } from "../models/user.model";
import { AppError } from "../utils/AppError";

const JWT_SECRET = "supersecretkey";
const JWT_EXPIRES_IN = "1h";

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(name: string, email: string, password: string): Promise<{ user: UserModel; token: string }> {
        const existingUser = this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new AppError("Email already in use", 400);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const allUsers = this.userRepository.findAll();
        const newId = allUsers.length > 0 ? allUsers[allUsers.length - 1].id + 1 : 1;

        const newUser = new UserModel(newId, name, email, passwordHash);
        this.userRepository.create(newUser);

        const token = this.generateToken(newUser.id);
        return { user: newUser, token };
    }

    async login(email: string, password: string): Promise<{ user: UserModel; token: string }> {
        const user = this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new AppError("Invalid email or password", 401);
        }

        const token = this.generateToken(user.id);
        return { user, token };
    }

    private generateToken(userId: number): string {
        return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
}
