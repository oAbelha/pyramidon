import axios from 'axios';

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 10000,
  });

  return {
    provide: {
      api,
    },
  };
});
