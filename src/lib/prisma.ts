import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../generated/prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Prisma Client returns records as POJOs, and if you attempt to stringify
 * an object w/ a `BigInt` field, the client will return an error;
 * for that reason, we need to cast it to a string.
 * @see https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types#serializing-bigint
 */
const convertBigIntExt = Prisma.defineExtension({
  name: 'convertBigIntExt',
  query: {
    $allOperations: async ({ args, query }) => {
      const result = await query(args);
      return JSON.parse(
        JSON.stringify(result, (_key, value) =>
          typeof value === 'bigint' ? value.toString() : value,
        ),
      );
    },
  },
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter }).$extends(convertBigIntExt);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
