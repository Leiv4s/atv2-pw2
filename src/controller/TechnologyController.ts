import { PrismaClient } from "@prisma/client";
import {v4 as uuid} from 'uuid'
import { Request,Response } from "express";
import { TechnologyBody } from "../types/TechnologyBody";
import { TechnologyParams } from "../types/TechnologyParams";

const prisma=new PrismaClient();

const createTechnology=async(req: Request,res:Response)=>{
    const {title,deadline}=req.body as TechnologyBody;
    try {
        const technology=await prisma.technology.create({
            data:{
                id:uuid(),
                title,
                deadline:new Date(deadline),
                idUser:req.userIndex
            }
        })
        res.status(201).json(technology)
    } catch (error) {
        console.log(error);
    }
}

const findTechnologiesByUsername=async(req:Request,res:Response)=>{
    try {
        const technologies=await prisma.technology.findMany({
            where:{
                idUser:req.userIndex
            }
        })
        res.status(200).json(technologies)
    } catch (error) {
        console.log(error);
    }
}

const deleteTechnology=async(req:Request,res:Response)=>{
    const {id}=req.params as TechnologyParams;
    try {
        await prisma.technology.delete({
            where:{
                id
            }
        });
        await findTechnologiesByUsername(req, res);
    } catch (error) {
        res.status(404).json({error:"Mensagem de erro"})
    }
}

const updateTechnology=async(req:Request<TechnologyParams, TechnologyBody>,res:Response)=>{
    const {id}=req.params as TechnologyParams;
    const {title,deadline}=req.body as TechnologyBody;

    try{
        const technology=await prisma.technology.update({
            where:{
                id
            },
            data:{
                title,
                deadline:new Date(deadline)
            }
        });
        res.status(201).json(technology);
    }catch(error){
        console.log(error);
        res.status(404).json({error:"Mensagem de erro"})
    }
}

const partialUpdateTechnology=async(req:Request,res:Response)=>{
    const {id}=req.params as TechnologyParams;
    try {
        const technology=await prisma.technology.update({
            where:{
                id
            },
            data:{
                studied:true
            }
        })
        res.status(201).json(technology);
    } catch (error) {
        res.status(404).json({error:"Mensagem de erro"});
    }
}

export {createTechnology,findTechnologiesByUsername,deleteTechnology,updateTechnology,partialUpdateTechnology}