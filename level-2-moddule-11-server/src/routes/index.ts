import { readUser, writeUsers } from "../helpers/fileDb";
import parseBody from "../helpers/parseBody";
import addRoutes from "../helpers/routhandler";
import sendJson from "../helpers/sendJson";

addRoutes("GET", "/",(req,res)=>{
    sendJson(res,200,{
        message:'Hello from node js with typescript...',
        path:req.url,
    });
})

addRoutes("GET","/api",(req,res)=>{
    sendJson(res,200,{
        message:"healt strus ok",
        path:req.url,
    })
})

addRoutes("POST",'/api/user',async(req,res)=>{
    const body =await parseBody(req);

    //userjson read
    const users= readUser()

    const newUser= {
        ...body,
    }
    users.push(newUser)
     writeUsers(users);
    sendJson(res,201,{succes:true,data:body})
})


addRoutes("PUT", "/api/user/:id", async(req,res)=>{
    const {id}=(req as any).params;
    const body = await parseBody(req);

    const users = readUser();

    const index = users.findIndex((user:any)=>user.id==id)

    if(index ===-1){
         sendJson(res, 404, {
    success:false,
messege:'user not found'
})
}
       

users[index]={
    ...users[index], 
    ...body
};

writeUsers(users);

sendJson(res, 202, {success:true, message: `id${id} user updated `,

    data:users[index]
})
})


// addRoutes("PUT", "/api/user/:id", async (req, res) => {
//   const { id } = (req as any).params;
//   const body = await parseBody(req);

//   const users = readUser();

//   const index = users.findIndex((user: any) => user.id == id);

//   if (index === -1) {
//     sendJson(res, 404, {
//       success: false,
//       message: "user not found",
//     });
//   }

//   users[index] = {
//     ...users[index],
//     ...body,
//   };

//   writeUsers(users);

//   sendJson(res, 202, {
//     success: true,
//     message: `id ${id} user updated`,
//     data: users[index],
//   });
// });