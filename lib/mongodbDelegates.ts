import { MongoClient, MongoClientOptions } from "mongodb";

const uri: string = process.env.MONGODB_DELEGATES_URI || "";
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your MongoDB Delegates URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoDelegatesClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoDelegatesClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoDelegatesClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
