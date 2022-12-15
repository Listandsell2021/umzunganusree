import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
 const { db } = await connectToDatabase();
//console.log(req.body)
   //const {email,pass}=req.body;
   const {params}=req.body
   //console.log(params)
   
   
   
   var todos;
  
   
   {/*if(params.role && params.currentPlan && params.status)
   {
    todos = await db.collection("Products").find({'role':params.role,'currentPlan:':params.currentPlan,'status':params.status}).toArray();
   }
   else if(params.currentPlan && params.status)
   {

   todos = await db.collection("Products").find({'currentPlan:':params.currentPlan,'status':params.status}).toArray();
    }
    else if (params.status)
    {
      todos = await db.collection("Products").find({'status':params.status}).toArray();
    }
    else if(params.role && params.status)
    {
    todos = await db.collection("Products").find({'role':params.role,'status':params.status}).toArray();
    }
    else if(params.role )
    {
    todos = await db.collection("Products").find({'role':params.role}).toArray();
    }
    else if(params.role && params.currentPlan)
    {
    todos = await db.collection("Products").find({'role':params.role,'currentPlan:':params.currentPlan}).toArray();
    }
    else if(params.currentPlan)
    {
    todos = await db.collection("Products").find({'currentPlan':params.currentPlan}).toArray();
    }*/}
    
    if(params.role=="superadmin")
    {
      if (params.q) {
        
        ///.*${params.q}.*/
        var s = /^`${params.q}`/;
        
        todos = await db
          .collection("Products")
          .find({ tittle: { $regex: params.q } })
          .toArray();
        console.log(todos);
      } else {
        todos = await db.collection("Products").find({}).toArray();
      }
    }
    else if (params.role == "admin")
    {
      if (params.q) {
        
        ///.*${params.q}.*/
        var s = /^`${params.q}`/;
        
        todos = await db
          .collection("ProductsAdmins")
          .find({ "tittle": { $regex: params.q }, "a_id": params.global_id })
          .toArray();
        console.log(todos);
      } else {
        todos = await db.collection("ProductsAdmins").find({"a_id":params.global_id}).toArray();
      }
    }
    else
    {
     
      if (params.q) {
        ///.*${params.q}.*/
        var s = /^`${params.q}`/;
        console.log(s);
        todos = await db
          .collection("ProductsAdmins")
          .find({ "tittle": { $regex: params.q }, "a_id": params.admin_id })
          .toArray();
        console.log(todos);
      } else {
        todos = await db
          .collection("ProductsAdmins")
          .find({ a_id: params.admin_id })
          .toArray();
      }
    }
      // const todos = await db.collection("Products").find({'role':params.role,'currentPlan:':params.currentPlan,'status':params.status}).toArray();
      res.status(200).json(todos);
  //await db.close();
}