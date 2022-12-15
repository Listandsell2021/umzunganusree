import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   //const {email,pass}=req.body;

  

  const theme = await db.collection("SuperAdmin").aggregate([
      { $match: { "sa_id": "s1" }},

    { $lookup:
       {
         from: 'SettingsSuperAdmin',
         localField: 'sa_id',
         foreignField: 'sa_id',
         as: 'theme'
       }
     }
    ]).toArray();
    
  res.status(200).json(theme);
  //await db.close();
}