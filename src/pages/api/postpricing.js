

import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const{logindata}=req.body;
  var myquery = { address: "Valley 345" };
  var newvalues = { name: "Mickey", address: "Canyon 123" };  
  const theme = await db.collection("Packages").updateOne(logindata);
   
  res.status(200).json(theme);
  //await db.close();
}