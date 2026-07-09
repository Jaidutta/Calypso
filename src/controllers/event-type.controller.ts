import { Request, Response } from "express";
import {
    findAllByHost as findAllByHostService,
    findById as findByIdService,
    createEventType as createEventTypeService,
    updateEventType as updateEventTypeService,
    deleteEventType as deleteEventTypeService
} from "../services/event-type.service.js";

import { sendSuccess } from "../utils/api-response.js";

export async function findByHost(req: Request, res: Response) {
    const { hostId } = req.query as unknown as { hostId: number };
    const response = await findAllByHostService(hostId);
    sendSuccess(res, response);
}

export async function findById(req: Request, res: Response) {
    const { id } = req.params as unknown as { id: number };
    const response = await findByIdService(id);
    sendSuccess(res, response);
}

export async function createEventType(req: Request, res: Response) {
    const newEventType = await createEventTypeService(req.body);
    sendSuccess(res, newEventType, 201, "EventType created successfully");
}

export async function updateEventType(req: Request, res: Response) {
    const { id } = req.params as unknown as { id: number };
    const updated = await updateEventTypeService(id, req.body);
    sendSuccess(res, updated, 200, "EventType updated successfully");
}

export async function deleteEventType(req: Request, res: Response) {
    const { id } = req.params as unknown as { id: number };
    await deleteEventTypeService(id);
    sendSuccess(res, null, 200, "EventType deleted successfully");
}