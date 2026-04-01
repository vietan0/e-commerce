import { headers } from 'next/headers';

export const userIdHeader = 'x-user-id';

/**
 * @returns user id set in headers by proxy.ts - only present in protected routes
 */
export default async function getUserId() {
  const headersList = await headers();
  const user_id = headersList.get(userIdHeader);

  if (!user_id) throw new Error(`Can't find header ${userIdHeader}`);
  return user_id;
}
