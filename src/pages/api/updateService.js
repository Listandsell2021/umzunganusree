import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {datanew}=req.body

  const todos = await db.collection("Services").update({"s_id" : datanew.s_id},{$set: {"sa_id":datanew.sa_id,
  "a_id":datanew.a_id,
  "tittle":datanew.tittle,
  "desc ":datanew.desc,
  "price":datanew.price,
  "service_type":datanew.service_type,
  "avatar":"/images/avatars/4.png",
  "status":datanew.status}});
  
  res.status(200).json(todos);
  //await db.close();
}