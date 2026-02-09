import postgres from 'postgres';

export const sql =
  process.env.NODE_ENV === 'production'
    ? postgres(process.env.DATABASE_URL, { ssl: 'require' }) // incorrect for now
    : postgres(process.env.DATABASE_URL);
