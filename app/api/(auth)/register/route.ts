import bcrypt from 'bcrypt';
import { type NextRequest, NextResponse } from 'next/server';
import createSession from '@/app/api/(auth)/_lib/createSession';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // 1. TODO: validate body
    // 2. Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    // 3. Create user record
    const user = await prisma.app_user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });
    // 4. Create session record & attach session_id to cookie
    await createSession(req, user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}
