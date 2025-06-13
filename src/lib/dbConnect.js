
import { MongoClient, ServerApiVersion } from 'mongodb';

export const collectionNameObj = {
    userCollection: "users"
}

export default function dbConnect(collectionName){
// const uri = process.env.MONGODB_URI;
const uri = "mongodb+srv://job-finder-portal:yYvrGa3LtTrL12YE@cluster0.9njqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
return client.db(process.env.DB_USER).collection(collectionName)
}


