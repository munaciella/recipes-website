// import clientPromise from './connection';
// import { NextApiRequest, NextApiResponse } from 'next';

// export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db('velovegans');
//     const recipes = await db.collection('recipes').find({}).toArray();
//     res.status(200).json(recipes);
//   } catch (error) {
//     console.error('Error fetching recipes:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

//   async function fetchRecipes() {
//     try {
//       const database = client.db("velovegans");
//       const recipes = database.collection<Recipe>("recipes");
//       const query = { runtime: { $lt: 15 } };
//       const cursor = recipes.find<Recipe>(
//         query,
//         {

//         }
//       );
//       if ((await recipes.countDocuments(query)) === 0) {
//         console.warn("No documents found!");
//       }
//       for await (const doc of cursor) {
//           console.dir(doc);
//           return doc
//       }
//     } finally {
//       await client.close();
//     }

//   }

//   run().catch(console.dir)
