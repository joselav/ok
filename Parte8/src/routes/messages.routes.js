import { Router } from "express";
import { messageModel } from "../models/message.models.js";

const messageRouter= Router();

messageRouter.get('/', async (req, res)=>{
    try{
        const messages = await messageModel.find().sort({ date: 'asc' });
        res.status(200).send(messages);
    }catch(error){res.status(400).send({respuesta:"No se ha logrado conseguir los mensajes", mensaje: error})}   
})

messageRouter.post('/',async (req,res)=>{
    const {user, message} = req.body;

    try{
        const users = await messageModel.find({user});
        if(users.length === 0){
            const mssUser =await messageModel.create({user, messages: [{message}]})
            res.status(200).send({respuesta: 'Se ha guardado el mensaje del usuario', mensaje: mssUser})
        }else{
            users[0].messages.push({message})
            res.status(200).send({respuesta:"Se ha guardado exitosamente su usuario y mensaje", mensaje: users})
            await users[0].save()
        }


    }catch(error){console.error("error", error)
        res.status(400).send({respuesta:"No se ha logrado guardar los datos", mensaje: error})}
})





export default messageRouter;