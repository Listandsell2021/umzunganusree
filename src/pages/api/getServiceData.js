import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
 const { db } = await connectToDatabase();
//console.log(req.body)
   //const {email,pass}=req.body;
   const {params}=req.body
   //console.log(params)
   
   
   
   var todos;
  
   
   if(params.role && params.currentPlan && params.status)
   {
    todos = await db.collection("Services").find({'role':params.role,'currentPlan:':params.currentPlan,'status':params.status}).toArray();
   }
   else if(params.currentPlan && params.status)
   {

   todos = await db.collection("Services").find({'currentPlan:':params.currentPlan,'status':params.status}).toArray();
    }
    else if (params.status)
    {
      todos = await db.collection("Services").find({'status':params.status}).toArray();
    }
    else if(params.role && params.status)
    {
    todos = await db.collection("Services").find({'role':params.role,'status':params.status}).toArray();
    }
    else if(params.role )
    {
    todos = await db.collection("Services").find({'role':params.role}).toArray();
    }
    else if(params.role && params.currentPlan)
    {
    todos = await db.collection("Services").find({'role':params.role,'currentPlan:':params.currentPlan}).toArray();
    }
    else if(params.currentPlan)
    {
    todos = await db.collection("Services").find({'currentPlan':params.currentPlan}).toArray();
    }
    else if(params.q)
    {

      console.log(params.q)
      ///.*${params.q}.*/
      var s=/^`${params.q}`/  
      console.log(s)
    todos = await db.collection("Services").find({"tittle":{'$regex': params.q}}).toArray();    
    console.log(todos)
    }
    else
    {
    todos = await db.collection("Services").find({}).toArray();
    }
    
 // const todos = await db.collection("Services").find({'role':params.role,'currentPlan:':params.currentPlan,'status':params.status}).toArray();
  res.status(200).json(todos);
  //await db.close();
}