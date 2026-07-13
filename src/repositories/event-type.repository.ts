import { prisma } from "../config/database.js";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dtos/event-type.dto.js";

export async function findByHostId(hostId: number) {
    const eventTypes = await prisma.eventType
    .findMany({ 
        where: { hostId }, 
        orderBy: { createdAt: "desc" } 
    });
    return eventTypes;
}

export async function getById(id: number) {
    const eventType = await prisma.eventType
    .findUnique({ 
        where: { id } 
    });
    return eventType;
}

export async function create(hostId: number, data: CreateEventTypeDto & { slug: string } ) {
    // it wants an object with all the properties of create event type plus the slug property in it 
    // which in not in createEventTypeDto
    const eventType =  await prisma.eventType.create({ 
        data: { 
            hostId, 
            ...data 
        } 
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
export async function slugExistsForHost(hostId: number, slug: string) {
    const eventType = await prisma.eventType
        .findFirst({
            where: {
                hostId,
                slug,
            } 
        });
    return eventType !== null;
}


export async function findActiveByHostIdAndEventSlug(hostId: number, slug: string) {
    const eventType = await prisma.eventType.findFirst({
        where: {
            isActive: true,
            slug,
            hostId: hostId
        }
    });
    return eventType;

}

export async function findActiveEventTypesByHost(hostId: number) {
    return prisma.eventType.findMany({
        where: {
            hostId,
            isActive: true,
        }
    })
}