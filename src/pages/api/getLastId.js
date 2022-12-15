import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
 const { db } = await connectToDatabase();

   const {datas}=req.body;

  console.log(datas.collection); 
  
   // Send all the todos

  const theme = await db.collection(datas.collection).count()
  
  res.status(200).json(theme);
  //await db.close();
}