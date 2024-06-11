// import mongoose from 'mongoose';

// global.mongoose = {
//   conn: null,
//   promise: null,
// };

// export async function dbConnect() {
//     if (global.mongoose && global.mongoose.conn) {
//         console.log('Connected from previous');
//         return global.mongoose.conn
//     } else {
//         const conString = process.env.MONGO_URL

//         const promise = mongoose.connect(conString, {
//             autoIndex: true,
//         })

//         global.mongoose = {
//             conn: await promise,
//             promise,
//         }
//         console.log('Newly connected');

//         return await promise
//     }
// }

import mongoose, { Mongoose } from "mongoose";

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

global.mongoose = global.mongoose || {
  conn: null,
  promise: null,
};

export async function dbConnect(): Promise<typeof mongoose> {
  if (global.mongoose && global.mongoose.conn) {
    console.log("Connected from previous");
    return global.mongoose.conn;
  } else {
    try {
      const conString = process.env.MONGO_URL as string;

      const promise = mongoose.connect(conString, {
        autoIndex: true,
      });

      global.mongoose = {
        conn: await promise,
        promise,
      };
      console.log("Newly connected");

      return await promise;
    } catch (error: unknown) {
      console.error("Error connecting to the database:", error);
      throw new Error("Database connection failed");
    }
  }
}

export const disconnect = () => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  mongoose.disconnect();
};
