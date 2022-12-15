import { MongoClient } from "mongodb";

//const MONGODB_URI = process.env.MONGODB_URI;

const MONGODB_URI ="mongodb+srv://Harpreet_LS:vCqPvAOnI5ueyfrV@cluster0.uveqwmb.mongodb.net/?retryWrites=true&w=majority";

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

let cachedClient= null;
let cachedDb = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI);
  await client.connect();
  let db = client.db("UMZUNG_CRM");

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}



