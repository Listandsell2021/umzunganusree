

import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const{logindata}=req.body;

  const theme = await db.collection("Login").insertOne(logindata);
   
  res.status(200).json(theme);
  //await db.close();
}