import { PrismaClient } from "@prisma/client";
import {v4 as uuid} from "uuid"
import { UserBody } from "../types/UserBody";
import { Request,Response } from "express";

const prisma=new PrismaClient();

export const createUser=async(req:Request,res:Response)=>{
    const {name,username}=req.body as UserBody;
    try {
        const user=await prisma.user.findUnique({
            where:{
                username
            }
        });
        if(user===null){
        const newUser=await prisma.user.create({
            data:{
                id:uuid(),
                name,
                username
            }
        });
        return res.status(201).json(newUser);
    }
        return res.status(404).send("Usuario já existe");
    } catch (e) {
        res.status(404).send("erro ao criar usuario")
    }
}