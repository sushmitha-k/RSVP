export const RSVP_SERVICES = {
  LIST: `${import.meta.env.VITE_BASE_URL}/api/clients`,
  UPDATE: (id: string) => `${import.meta.env.VITE_BASE_URL}/api/clients/${id}`,
  SEARCH_LIST: `${import.meta.env.VITE_BASE_URL}/api/clients/search`,
};
