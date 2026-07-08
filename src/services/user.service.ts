import { getAll, getById, getUserByEmail, create } from "../repositories/user.repository.js";
import { conflict, notFound } from "../utils/api-errors.js";
import { CreateUserDto } from "../dtos/user.dto.js";

export async function findAllUsers() {
    const users = await getAll();
    return users;
}

export async function findById(id: number) {
    const user = await getById(id);

    if (!user) {
        throw notFound(`User with id: ${id} not found`);
    }
    return user;
}

export async function createUser(data: CreateUserDto) {

    // first check if the user with the email already exists
    const userExists = await getUserByEmail(data.email);

    if (userExists) {
        throw conflict(`User with email: ${data.email} already exists`);
    }
    
    const user = await create(data);
    return user;
}