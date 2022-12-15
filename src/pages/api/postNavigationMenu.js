import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

     const{navigationData}=req.body;


  const todos = await db.collection("Navigation_crm").insertOne(navigationData);
  
  res.status(200).json(todos);
  //await db.close();
}


