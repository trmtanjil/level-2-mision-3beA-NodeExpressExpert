import  express, { Request, Response }  from "express";
import { todosControllers } from "./todos.controller";
import logger from "../../midleware/loger";



const router = express.Router();

router.post('/',todosControllers.creatTodos)

router.get('/',todosControllers.getTodos)
 router.get('/:id',todosControllers.getsingleTodos)


router.put("/:id", logger,todosControllers.updateTodos);


router.delete("/:id", todosControllers.deleteTodos)

export const todosRouter = router