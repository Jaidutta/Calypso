import { Router } from "express";
import { findAllUsers, findById, createUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../dtos/user.dto.js";

export const userRouter: Router = Router();

userRouter.get("/", findAllUsers)
userRouter.get("/:id", findById)  
userRouter.post("/",validate(createUserSchema), createUser)
