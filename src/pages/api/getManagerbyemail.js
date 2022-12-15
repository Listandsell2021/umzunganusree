import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {email}=req.body
   //console.log("test")
  console.log(email)
  const todos = await db.collection("Manager").find({"email":email}).toArray();
   //console.log(todos)
  res.status(200).json(todos);
  //await db.close();
}