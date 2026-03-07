import bcrypt from 'bcrypt';
import { type NextRequest, NextResponse } from 'next/server';
import createSession from '@/app/api/(auth)/_lib/createSession';
import { prisma } from '@/src/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // 1. TODO: validate body
    // 2. Find in table `user` a row with matching email
    const user = await prisma.app_user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user)
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 },
      );

    // 3. Compare sent password with hashed password from user row.
    const passwordIsCorrect = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!passwordIsCorrect)
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 },
      );

    // 4. Create session record & attach session_id to cookie
    await createSession(request, user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}
