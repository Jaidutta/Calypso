import {getAllByHostId as getAllEventsByHostId, getById as getEventById, create as createEvent, update as updateEvent, remove as deleteEvent }from "../repositories/event-type.repository.js";
import { getById as getUserById} from "../repositories/user.repository.js";
import { notFound } from "../utils/api-errors.js";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dtos/event-type.dto.js";

export async function findAllByHost(hostId: number) {
    const userExists = await getUserById(hostId);
    if (!userExists) throw notFound(`Host user with id: ${hostId} does not exist`);
    return await getAllEventsByHostId(hostId);
}

export async function findById(id: number) {
    const eventType = await getEventById(id);
    if (!eventType) throw notFound(`EventType with id: ${id} not found`);
    return eventType;
}

export async function createEventType(data: CreateEventTypeDto) {
    const userExists = await getUserById(data.hostId);
    if (!userExists) throw notFound(`Host user with id: ${data.hostId} does not exist`);
    return await createEvent(data);
}

export async function updateEventType(id: number, data: UpdateEventTypeDto) {
    const existing = await getEventById(id);
    if (!existing) throw notFound(`EventType with id: ${id} not found`);
    return await updateEvent(id, data);
}

export async function deleteEventType(id: number) {
    const existing = await getEventById(id);
    if (!existing) throw notFound(`EventType with id: ${id} not found`);
    await deleteEvent(id);
}