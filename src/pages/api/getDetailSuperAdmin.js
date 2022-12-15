import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {id}=req.body;
  


  const theme = await db.collection("Login").aggregate([
      { $match: { "global_id": id }},

    { $lookup:
       {
         from: 'SuperAdmin',
         localField: 'global_id',
         foreignField: 'sa_id',
         as: 'details'
       }
     }
    ]).toArray();
 
  res.status(200).json(theme);
  //await db.close();
}