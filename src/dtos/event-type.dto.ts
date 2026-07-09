import { z } from "zod";

export const createEventTypeSchema = z.object({
    hostId: z
        .number()
        .int("hostId must be an integer")
        .positive("hostId must be positive"),

    title: z
        .string()
        .min(1, "Title is required")
        .max(150, "Title is too long"),

    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .nullable(),

    durationMinutes: z
        .number()
        .int("Duration must be an integer")
        .min(1, "Duration must be at least 1 minute"),

    isActive: z.boolean().optional(),

    locationType: z.string().optional(),

    locationValue: z
        .string()
        .max(255)
        .optional()
        .nullable(),

    bufferBeforeMinutes: z.number().int().min(0).optional(),

    bufferAfterMinutes: z.number().int().min(0).optional(),
});

export type CreateEventTypeDto = z.infer<typeof createEventTypeSchema>;

export const updateEventTypeSchema = createEventTypeSchema
    .partial()
    .omit({ hostId: true })
    .refine(
        (data) => Object.keys(data).length > 0,
        { message: "At least one field must be provided for patch updates" }
    );

export type UpdateEventTypeDto = z.infer<typeof updateEventTypeSchema>;