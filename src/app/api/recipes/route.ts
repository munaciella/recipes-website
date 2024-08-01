import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('velovegans');
    const recipes = await db.collection('recipes').find({}).toArray();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ message: 'Error fetching recipes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('velovegans');
    const newRecipe = await request.json();
    await db.collection('recipes').insertOne(newRecipe);
    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error('Error adding recipe:', error);
    return NextResponse.json({ message: 'Error adding recipe' }, { status: 500 });
  }
}