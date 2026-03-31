import type { NextRequest } from 'next/server';
import sendEmail from '@/app/api/send-email/sendEmail';

export async function POST(req: NextRequest) {
  try {
    /* body: {
      templateName: string;
      templateProps: object;
      subject: string;
      to: string[]
    } */
    const body = await req.json();
    const data = await sendEmail(body);
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
