import { NextResponse } from 'next/server';
import getSession from '@/app/api/(auth)/_lib/getSession';

export async function GET() {
  try {
    const sessionResult = await getSession();

    return NextResponse.json(sessionResult, {
      status: sessionResult.error ? 401 : 200,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}
