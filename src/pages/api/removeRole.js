import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { deleteRole } = req.body;

  const todos = await db.collection("Role").deleteOne({
    title: deleteRole.title,
    global_id:deleteRole.global_id
  });

  res.status(200).json(todos);
  //await db.close();
}
