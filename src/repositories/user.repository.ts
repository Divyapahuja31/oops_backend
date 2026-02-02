import { UserModel } from "../models/user.model";
import { users } from "../utils/data.store";

export class UserRepository {
    create(user: UserModel): UserModel {
        users.push(user);
        return user;
    }

    findByEmail(email: string): UserModel | undefined {
        return users.find((u) => u.email === email);
    }

    findById(id: number): UserModel | undefined {
        return users.find((u) => u.id === id);
    }

    findAll(): UserModel[] {
        return users;
    }
}
