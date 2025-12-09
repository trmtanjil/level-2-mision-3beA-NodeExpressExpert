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
 // --- DELETE Method Added Here ---
// addRoutes("DELETE", "/api/user/:id", (req, res) => {
//     const { id } = (req as any).params;

//     let users = readUser(); // Use 'let' so we can reassign

//     // Find the initial length
//     const initialLength = users.length;

//     // Filter out the user with the matching id
//     users = users.filter((user: any) => user.id !== id);

//     // Check if the length changed (i.e., if a user was deleted)
//     if (users.length === initialLength) {
//         // No user was deleted, so the user was not found
//         sendJson(res, 404, {
//             success: false,
//             message: `User with ID ${id} not found.`
//         });
//         return;
//     }

//     // Write the modified list back to the file
//     writeUsers(users);

//     // Send a 204 No Content response (common for successful DELETE) or 200/202
//     sendJson(res, 200, {
//         success: true,
//         message: `User with ID ${id} deleted successfully.`
//     });
// });
addRoutes("DELETE", "/api/user/:id", (req, res) => {
    const { id } = (req as any).params;
    
    // FIX: Convert the string 'id' to an integer using parseInt()
    const userIdToDelete = parseInt(id); 

    let users = readUser();
    const initialLength = users.length;

    // Filter out the user using the numeric ID
    users = users.filter((user: any) => user.id !== userIdToDelete);

    // Check if the length changed
    if (users.length === initialLength) {
        sendJson(res, 404, {
            success: false,
            message: `User with ID ${id} not found.`
        });
        return;
    }

    writeUsers(users);

    sendJson(res, 200, {
        success: true,
        message: `User with ID ${id} deleted successfully.`
    });
});