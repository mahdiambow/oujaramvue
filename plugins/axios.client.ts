import axios from "axios";

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: "https://api.doornica.ir/api",
  });

  return {
    provide: {
      api,
    },
  };
});
