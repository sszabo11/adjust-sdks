import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
  return {
    authenticated: true
  };
};
