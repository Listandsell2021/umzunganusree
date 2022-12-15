import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { ids } = req.body;
  //console.log("test")
  console.log(ids.id);
  const todos = await db
    .collection("ProductsAdmins")
    .find({ a_id: ids.id })
    .toArray();
  
  res.status(200).json(todos);
  //await db.close();
}
