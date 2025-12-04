declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_URL_LOCAL: string;
      POSTGRES_URL: string;
    }
  }
}

export {};
