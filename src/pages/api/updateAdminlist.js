import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {datanew}=req.body
   console.log(datanew)
  const todos = await db.collection("Admin").update(
    {"a_id" : datanew.a_id},
    {$set: 
        {
      "sa_id":"sa1",
      "a_id":datanew.a_id,
      "address":datanew.address,
      "token":"123333sddss",
      "contact":datanew.contact,
      "full_name":datanew.full_name,
      "status":datanew.status,
      "email":datanew.email,
      "username":datanew.username,
      "company_name":datanew.company_name
    }});
  
  res.status(200).json(todos);
  //await db.close();
}
  