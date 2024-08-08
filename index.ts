import express from "express";
import { userRouter } from "./src/routes/UserRoutes";
import { technologyRouter } from "./src/routes/TechnologyRoutes";

const app=express();
app.use(express.json())

const porta=8080;

app.use('/user',userRouter)
app.use('/technology',technologyRouter)

app.listen(porta,()=>{
    console.log("servidor online");
})