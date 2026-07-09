import { z } from "zod";

export const idParamSchema = z.object({
    id: z.coerce.number({ error: "id must be a number" }).int().positive("id must be a positive integer")
});