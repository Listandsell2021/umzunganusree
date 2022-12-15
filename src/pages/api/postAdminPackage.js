import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

     const{postAdminPackage}=req.body;


  const todos = await db.collection("AdminPackage").insertOne(postAdminPackage);
  
  res.status(200).json(todos);
  //await db.close();
}


