import { z } from "zod";

export const createEventTypeSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(200, "Title must be of maximum 200 characters"),

    description: z
        .string()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional(),

    durationMinutes: z
        .number()
        .int("Duration must be an integer")
        .min(15, "Duration must be at least 1 minute")
        .max(120, "Maximum Duration is 120 minutes")
        .default(30),
        

    isActive: z
        .boolean()
        .default(true),

    locationType: z
        .enum(["online", "in-person"])
        .default("online"),

    locationValue: z
        .string()
        .optional(),

    bufferBeforeMinutes: z
        .number()
        .int("Buffer before must be an integer")
        .min(0, "Buffer before cannot be negative")
        .max(120, "Buffer before cannot be more than 120 minutes")
        .default(0),

    bufferAfterMinutes: z
        .number()
        .int("Buffer before must be an integer")
        .min(0, "Buffer before cannot be negative")
        .max(120, "Buffer before cannot be more than 120 minutes")
        .default(0),
    
    slug: z
        .string()
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
        .optional()

        // why don't we have hostId here? It is because users are authenticated and userId is
        // injected into the request 
});



export const updateEventTypeSchema = createEventTypeSchema
    .partial() // it can have all the properties of createEventTypeSchema or a subset of them



export type CreateEventTypeDto = z.infer<typeof createEventTypeSchema>;
export type UpdateEventTypeDto = z.infer<typeof updateEventTypeSchema>;