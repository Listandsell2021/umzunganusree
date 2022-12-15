
import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   //const {email,pass}=req.body;

  
  
   // Send all the todos

  const theme = await db.collection("Packages").find({}).toArray();
   
  res.status(200).json(theme);
  // await db.close();
}