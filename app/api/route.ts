import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';
import postgres from 'postgres';

if (!process.env.POSTGRES_URL) {
  throw new Error(`Database URL is ${process.env.POSTGRES_URL}`);
}

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function GET() {
  const result = await sql`
    SELECT * FROM pgadmin;
  `;
  return NextResponse.json({ message: 'Hello Tiger!', result });
}

export async function POST() {
  const randomName = faker.person.firstName();
  const randomInt = faker.number.int({ max: 1000 });
  try {
    const result = await sql`
      INSERT INTO pgadmin(name, id) VALUES (${randomName}, ${randomInt}) RETURNING *
    `;
    return NextResponse.json({
      message: 'You just sent a POST request',
      result,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
