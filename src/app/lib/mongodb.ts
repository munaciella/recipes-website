import { MongoClient } from 'mongodb';

if (process.env.NODE_ENV !== 'production') {
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongoClient = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  if (!globalWithMongoClient._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongoClient._mongoClientPromise = client.connect();
    console.log('Connecting to MongoDB in development mode...');
  } else {
    console.log('Reusing existing MongoDB connection in development mode...');
  }

  clientPromise = globalWithMongoClient._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  console.log('Connecting to MongoDB in production mode...');
}

clientPromise
  .then(() => console.log('MongoDB connected successfully'))
  .catch(error => console.error('MongoDB connection error:', error));

export default clientPromise;