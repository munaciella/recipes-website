// import { MongoClient } from 'mongodb';

// const URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;
// const options = {}

// if (!URI) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }

// let client: new MongoClient(URI, options)
// let clientPromise: Promise<MongoClient>;

// declare global {
//   namespace NodeJS {
//     interface Global {
//       _mongoClientPromise: Promise<MongoClient>;
//     }
//   }
// }

// const globalForMongo = global as typeof global & NodeJS.Global;

// if (process.env.NODE_ENV !== 'production') {
//   if (!globalForMongo._mongoClientPromise) {
//     globalForMongo._mongoClientPromise = client.connect();
//   }

//   clientPromise = globalForMongo._mongoClientPromise;
// } else {
//   clientPromise = client.connect();
// }

// export default clientPromise;

// import { MongoClient } from "mongodb";

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

// const uri: string = process.env.MONGODB_URI;
// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {

//   let globalWithMongoClientPromise = global as typeof globalThis & {
//     _mongoClientPromise: Promise<MongoClient>;
//   };

//   if (!globalWithMongoClientPromise._mongoClientPromise) {
//     client = new MongoClient(uri);
//     globalWithMongoClientPromise._mongoClientPromise = client.connect();
//   }

//   clientPromise = globalWithMongoClientPromise._mongoClientPromise;
// } else {
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// export default clientPromise;
