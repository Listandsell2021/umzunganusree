import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {data}=req.body;

  
  
   // Send all the todos
   console.log(data.id)
  const todos = await db.collection("Navigation_crm").find({"global_id":data.id}).toArray();
  
  res.status(200).json(todos);
  //await db.close();
}