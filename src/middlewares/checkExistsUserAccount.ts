import { PrismaClient } from "@prisma/client";
import {Request,Response,NextFunction} from 'express'

const prisma=new PrismaClient();

export const checkExistsUserAccount=async(req:Request,res:Response,next:NextFunction)=>{
    let {username}=req.headers;
    if (Array.isArray(username)) {
        username = username[0];
      }
    try {
        const user=await prisma.user.findUnique({
            where:{
                username
            },
        });

    if (user) {
        req.userIndex=user.id;
      } else {
        res.status(404).send("user not exists")
        return null;
      }
        next();
    } catch (error) {
        console.log(error);
    }
}