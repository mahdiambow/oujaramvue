<template>
    <div>
         <main>
      <slot />
    </main>
    </div>
</template>

<script setup>
import axios from "axios";
import { useAuthStore } from "~/store/auth";
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
    //   showLoading.value = false;
      return true;
    }
  } catch (e) {
    // showLoading.value = false;
    navigateTo("/login");
    return false;
  }
};
onMounted(() => {
    // validate()
});
</script>
