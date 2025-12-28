import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!process.client) return;

  const auth = useAuthStore();
  const token =
    auth.tokenUserWebsite || localStorage.getItem("UserTokenWebsite");

  const isLoginPage = to.path === "/login";
  const requiresAuth = to.path.startsWith("/users");

  // صفحات محافظت شده
  if (requiresAuth && !token) {
    return navigateTo("/login");
  }

  // لاگین رفته در حالی که لاگین هست
  if (token && isLoginPage) {
    return navigateTo("/users");
  }
});
