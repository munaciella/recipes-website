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


// import mongoose, { Mongoose } from 'mongoose';

// declare global {
//   var mongoose: {
//     conn: Mongoose | null,
//     promise: Promise<Mongoose> | null,
//   };
// }

// global.mongoose = global.mongoose || {
//   conn: null,
//   promise: null,
// };

// const MONGODB_URI: string = process.env.NEXT_PUBLIC_MONGO_URI as string;

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   );
// }

// let cached = global.mongoose;

// async function dbConnect(): Promise<Mongoose> {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       console.log('Db connected');
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default dbConnect;
