import { Request, Response } from "express";
import {findAllUsers as findAllUserService} from "../services/user.service.js";
import { findById as findByIdService } from "../services/user.service.js";
import { createUser as createUserService } from "../services/user.service.js";

import { sendSuccess } from "../utils/api-response.js";


export async function findAllUsers(_req: Request, res: Response) {
    const response = await findAllUserService();

    // res.json(response);
    sendSuccess(res, response);
}

export async function findById(req: Request, res:  Response) {
    const {id} = req.params;
    const response = await findByIdService(Number(id));
    
    // res.json(response)
    sendSuccess(res, response);
}

export async function createUser(req: Request, res: Response){
   const newUser = await createUserService(req.body);
   sendSuccess(res, newUser, 201, "User created successfully");
}