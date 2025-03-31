import express, { Request, Response } from "express"
import client from "prom-client"


const app=express()

const collectDefaultMetrics=client.collectDefaultMetrics

collectDefaultMetrics({register:client.register})


app.get('/user',(req:Request,res:Response)=>{
    res.json({data:{
        json:"ok"
    }})
})


app.get("/metrics", async (req: Request, res: Response) => {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});

app.listen(3000,()=>{
    console.log("server runing");
    
})