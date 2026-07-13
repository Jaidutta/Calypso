import { getAll, getById, getUserByEmail, create, update, remove } from "../repositories/user.repository.js";
import { conflict, notFound } from "../utils/api-errors.js";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js";
import slug from 'slug';
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
    const slugPassed = data.slug ?? slug(data.name, {lower:  true})
    const user = await create({...data, slug: slugPassed});
    return user;
}

export async function updateUser(id: number, data: UpdateUserDto) {
    const user = await getById(id);
    
    if (!user) {
        throw notFound(`User with id: ${id} not found`);
    }

    

    if (data.email && data.email !== user.email) {
        const userExists = await getUserByEmail(data.email);

        if (userExists) {
            throw conflict(`User with email: ${data.email} already exists`);
        }
    }

    const updatedUser = await update(id, data);
    return updatedUser;
}

export async function deleteUser(id: number) {
    
    const userExists = await getById(id);
    
    if (!userExists) {
        throw notFound(`User with id: ${id} not found`);
    }

    await remove(id);
}