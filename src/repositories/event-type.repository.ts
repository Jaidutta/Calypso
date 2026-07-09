import { prisma } from "../config/database.js";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dtos/event-type.dto.js";

export async function getAllByHostId(hostId: number) {
    return await prisma.eventType.findMany({ where: { hostId } });
}

export async function getById(id: number) {
    return await prisma.eventType.findUnique({ where: { id } });
}

export async function create(data: CreateEventTypeDto) {
    return await prisma.eventType.create({ data });
}

export async function update(id: number, data: UpdateEventTypeDto) {
    return await prisma.eventType.update({ where: { id }, data });
}

export async function remove(id: number) {
    await prisma.eventType.delete({ where: { id } });
}