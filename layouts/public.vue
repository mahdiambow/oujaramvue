<template>
  <div>
    <PublicNavbar />
    <PublicLoading />
    <main>
      <slot />
    </main>
    <!-- <PublicFooter /> -->
  </div>
</template>
  
  <script setup>
import axios from "axios";
import { useAuthStore } from "~/store/auth";
import { ref, onMounted } from "vue";
// const showLoading = ref(true);

const validate = async () => {
  let t = useAuthStore().tokken;
  const url = "https://api.doornica.ir/api/v1/authenticate/me";

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + t,
    },
  };
  try {
    const axiosResponse = await axios.get(url, config);
    const serverResponse = axiosResponse.data;
    if (serverResponse.status === "success") {
      useAuthStore().setTokenUser(t);
      navigateTo("/users");
      // showLoading.value = false;
      return true;
    }
  } catch (e) {
    navigateTo("/login");
    return false;
  }
};
onMounted(() => {
  // validate();
  // setTimeout(() => {
  //     showLoading.value = false;
  //   }, 1000);
});
</script>