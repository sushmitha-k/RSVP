const base_url = import.meta.env.VITE_BASE_URL;

export const RSVP_SERVICES = {
  LIST: `${base_url}/api/clients`,
  UPDATE: (id: string) => `${base_url}/api/clients/${id}`,
  SEARCH_LIST: `${base_url}/api/clients/search`,
};
