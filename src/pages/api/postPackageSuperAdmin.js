import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

     const{packageData}=req.body;


  const todos = await db.collection("Packages_SuperAdmin").insertOne(packageData);
  
  res.status(200).json(todos);
  //await db.close();
}


