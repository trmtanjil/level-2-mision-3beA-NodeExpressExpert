import express, { Request, Response } from "express"
 import { userControllers } from "./user.controller";
import logger from "../../midleware/loger";
import auth from "../../midleware/auth";

const router =express.Router();

router.post("/",userControllers.creatUser)

router.get('/',logger,auth(),userControllers.getUser)


 router.get('/:id',userControllers.getsingleUser)


 router.put("/:id",userControllers.updateUser)

 router.delete("/:id", userControllers.delteUser)

export const userRouter = router
