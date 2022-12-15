
import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {id}=req.body;

  
  
   // Send all the todos
     console.log("id")
      console.log(req.body);
  const theme = await db.collection("Role").find({"global_id": id }).toArray();
   
  res.status(200).json(theme);
  // await db.close();
}