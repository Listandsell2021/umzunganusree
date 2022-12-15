import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {ids}=req.body
   //console.log("test")
  console.log(ids)
  const todos = await db.collection("Admin").find({"email":ids.email}).toArray();
   //console.log(todos)
  res.status(200).json(todos);
  //await db.close();
}