import { NextResponse } from 'next/server';
import checkSession from '@/app/api/(auth)/_lib/checkSession';

export async function GET() {
  try {
    const checkSessionResult = await checkSession();

    return NextResponse.json(checkSessionResult, {
      status: checkSessionResult.error ? 401 : 200,
    });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}
