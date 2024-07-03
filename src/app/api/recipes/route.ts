import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('velovegans'); // Replace with your database name
    const recipes = await db.collection('recipes').find({}).toArray();
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching recipes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('velovegans'); // Replace with your database name
    const newRecipe = await request.json();
    await db.collection('recipes').insertOne(newRecipe);
    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding recipe' }, { status: 500 });
  }
}
