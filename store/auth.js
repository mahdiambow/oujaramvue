import { defineStore } from "pinia";
// const router = useRouter();
export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: true,
    token: null,
    tokenUserWebsite: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,

    tokken: (state) => localStorage.getItem("UserTokenWebsite"),
    tokenUserWebsite: (state) => localStorage.getItem("UserTokenWebsite"),
  },
  actions: {
    setTokenUser(tokenUserWebsite) {
      this.tokenUserWebsite = tokenUserWebsite;
      localStorage.setItem("UserTokenWebsite", tokenUserWebsite);
    },

    clearTokensUser() {
      this.tokenUserWebsite = null;

      this.setTokenUser(null);

      localStorage.removeItem("UserTokenWebsite");
    },

    logout() {
      this.tokenUserWebsite = null;
      this.token = null;
      this.isAuthenticated = false;

      localStorage.removeItem("UserTokenWebsite");
    },
  },
});
