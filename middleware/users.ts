import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const auth = useAuthStore();

    const checkTokenPresence = () => {
      const token =
        auth.tokenUserWebsite || localStorage.getItem("UserTokenWebsite");
      if (!token) {
        navigateTo("/login");
      }
    };

    // چک اولیه هنگام ورود به صفحه
    checkTokenPresence();

    // چک دوره‌ای هر 1 ثانیه برای سناریوی حذف دستی توکن در DevTools
    const interval = setInterval(() => {
      checkTokenPresence();
    }, 1000);

    // وقتی کاربر از این صفحه خارج شد، تایمر را پاک کن تا منابع آزاد شود
    onUnmounted(() => clearInterval(interval));
  }
});
