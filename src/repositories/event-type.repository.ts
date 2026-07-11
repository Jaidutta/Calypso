import { prisma } from "../config/database.js";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dtos/event-type.dto.js";

export async function getAllByHostId(hostId: number) {
    const eventTypes = await prisma.eventType
    .findMany({ 
        where: { hostId }, 
        orderBy: { createdAt: "desc" } 
    });
    return eventTypes;
}

export async function getById(id: number) {
    return await prisma.eventType
    .findUnique({ 
        where: { id } 
    });
}

export async function create(hostId: number, data: CreateEventTypeDto) {
    const eventType =  await prisma.eventType.create({ 
        data: { hostId, ...data } 
    });
    return eventType;
}

export async function update(id: number, data: UpdateEventTypeDto) {
    const updatedEventType = await prisma.eventType.
    update({ 
        where: { id },
         data 
    });
    return updatedEventType;
}

export async function remove(id: number) {
    await prisma.eventType.delete({ where: { id } });
}

export async function findByHostIdAndSlug(hostId: number, slug: string) {
    const eventType = await prisma.eventType
        .findFirst({
            where: {
                hostId,
                slug,
            } 
        });
    return eventType;
}

// a function that checks if a slug already exists for a host
export async function existsByHostIdAndSlug(hostId: number, slug: string) {
    const eventType = await prisma.eventType
        .findFirst({
            where: {
                hostId,
                slug,
            } 
        });
    return eventType !== null;
}