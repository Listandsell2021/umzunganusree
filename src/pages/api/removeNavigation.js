import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

     const{deletenavigation}=req.body;


  const todos = await db.collection("Navigation_crm").deleteOne({"global_id" : deletenavigation.global_id,title:deletenavigation.tittle});
  
  res.status(200).json(todos);
  //await db.close();
}


