import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { datanew } = req.body;

  //var datanew={"test":"tett"}

  // Send all the todos
  
  var todos;
  if (datanew.role == "superadmin") {
      todos = await db.collection("Products").insertOne(datanew);
  } else if (datanew.role == "admin") {
     todos = await db.collection("ProductsAdmins").insertOne(datanew);
  } else {
    todos = await db.collection("ProductsAdmins").insertOne(datanew);
  }

  res.status(200).json(todos);
  //await db.close();
}
