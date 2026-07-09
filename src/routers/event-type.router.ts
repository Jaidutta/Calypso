import { Router } from "express";
import {findByHost, findById, createEventType, updateEventType, deleteEventType}from "../controllers/event-type.controller.js";
import { validateBody, validateParams } from "../middlewares/validate.js";
import { createEventTypeSchema, updateEventTypeSchema } from "../dtos/event-type.dto.js";
import { idParamSchema } from "../dtos/common.dto.js";

export const eventTypeRouter: Router = Router();

eventTypeRouter.get("/", findByHost);
eventTypeRouter.get("/:id", validateParams(idParamSchema), findById);
eventTypeRouter.post("/", validateBody(createEventTypeSchema), createEventType);
eventTypeRouter.patch("/:id", validateParams(idParamSchema), validateBody(updateEventTypeSchema), updateEventType);
eventTypeRouter.delete("/:id", validateParams(idParamSchema), deleteEventType);