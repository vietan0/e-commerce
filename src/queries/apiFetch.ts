import { ofetch } from 'ofetch';

const apiFetch = ofetch.create({ baseURL: '/api' });

export default apiFetch;
