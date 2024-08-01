import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    console.log('Connected to MongoDB');

    const db = client.db('velovegans');
    const recipes = await db.collection('recipes').find({}).toArray();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Error fetching recipes', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error fetching recipes', error: 'Unknown error' }, { status: 500 });
    }
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
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Error adding recipe', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error adding recipe', error: 'Unknown error' }, { status: 500 });
    }
  }
}