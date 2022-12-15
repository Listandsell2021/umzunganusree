import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {datanew}=req.body
   console.log(datanew)
  const todos = await db.collection("Packages_SuperAdmin").update(
    {"plan_id" : datanew.plan_id},
    {$set: 
        {
       "title":datanew.title,
    "monthlyPrice":datanew.monthlyPrice,
    "subtitle":datanew.subtitle,
    "imgSrc":"/images/pages/pricing-illustration-1.png",
    "yearlyPlan":datanew.yearlyPlan,
    "planBenefits":datanew.planBenefits,
   
    }});
  
  res.status(200).json(todos);
  //await db.close();
}
  