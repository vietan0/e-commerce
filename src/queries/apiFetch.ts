import { ofetch } from 'ofetch';

const apiFetch = ofetch.create({
  baseURL:
    // relative path is only allowed in client, not server
    typeof window === 'undefined'
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api`
      : '/api',
});

export default apiFetch;
