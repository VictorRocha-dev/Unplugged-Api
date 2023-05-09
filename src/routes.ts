import { CreateUserController } from "@/modules/user/useCases/createUser/createUserController";
import { Router } from "express";
const router  = Router();

const createUserController = new CreateUserController(); //controller do usuario 


//rotas do usuario do usuarios 
router.post("/users", createUserController.handle);


export {router};