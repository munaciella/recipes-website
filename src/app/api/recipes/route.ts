import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

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