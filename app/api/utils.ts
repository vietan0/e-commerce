import postgres from 'postgres';

export const sql =
  process.env.NODE_ENV === 'production'
    ? postgres(process.env.POSTGRES_URL, { ssl: 'require' })
    : postgres(process.env.POSTGRES_URL_LOCAL);
