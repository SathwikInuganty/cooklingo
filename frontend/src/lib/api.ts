export const API_BASE = import.meta.env.VITE_API_URL || '/api';
export const api = (path: string) => `${API_BASE}${path}`;
