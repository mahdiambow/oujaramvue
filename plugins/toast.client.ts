import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  // اتصال به اپ Vue
  nuxtApp.vueApp.use(Toast, {
    position: "top-right",
    timeout: 4000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    icon: true,
    transition: "Vue-Toastification__slideBlurred",
    maxToasts: 5,
  });

  const toast = useToast();

  // توابع عمومی
  const toastSuccess = (message = "عملیات با موفقیت انجام شد ✅") => {
    toast.success(message, {
      timeout: 3000,
      icon: "✅",
    });
  };

  const toastError = (message = "خطایی رخ داده است ❌") => {
    toast.error(message, {
      timeout: 4000,
      icon: "⚠️",
    });
  };

  // در اختیار Nuxt App قرار بده
  return {
    provide: {
      toastSuccess,
      toastError,
    },
  };
});
