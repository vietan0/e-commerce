import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import MeClient from '@/app/(main)/(public)/(user)/me/MeClient';
import { getMe } from '@/src/queries/auth/useMe';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  try {
    const data = await getMe({ Cookie: cookieStore.toString() });

    return {
      title: data!.app_user.name,
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'User',
    };
  }
}

export default function Me() {
  return <MeClient />;
}
