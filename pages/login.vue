<template>
  <div>
    <section>
      <div class="container-fluid" style="margin-top: 6rem">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-8 col-10">
              <div class="row">
                <div class="col-12">
                  <div class="card w-100 p-3">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-12">
                          <div class="row">
                            <div class="col-12 d-flex justify-content-center">
                              <img
                                src="/assets/images/logo.webp"
                                style="height: 5rem"
                                class="img-fluid"
                                alt=""
                              />
                            </div>

                            <div class="col-12" v-if="numberBox">
                              <div
                                class="row d-flex d-flex justify-content-center"
                              >
                                <div class="col-12 mt-5">
                                  <h5
                                    class="text-center"
                                    style="font-weight: bold"
                                  >
                                    ورود به حساب کاربری
                                  </h5>
                                </div>
                                <div
                                  class="col-12 col-lg-8 d-flex justify-content-center flex-column mt-5"
                                >
                                  <div
                                    class="form-group d-flex justify-content-center flex-column"
                                  >
                                    <div class="d-flex justify-content-center">
                                      <label for="">شماره موبایل</label>
                                    </div>

                                    <input
                                      style="
                                        padding: 0.7rem;
                                        border-radius: 15px;
                                        border: 1px solid #f26419;
                                      "
                                      class="form-control mt-2 text-center"
                                      v-model="dataItem.mobile"
                                      pattern="[0-9]*"
                                      inputmode="numeric"
                                      @input="
                                        $event.target.value =
                                          $event.target.value.replace(
                                            /[^0-9]/g,
                                            ''
                                          )
                                      "
                                    />
                                  </div>
                                </div>

                                <div class="col-12 col-lg-8 mt-3">
                                  <UserButtonLoading
                                    @click="submitNumber()"
                                    :widthStyle="btnLoadingWidth"
                                    :loading="btnLoading"
                                    :title="textBtnLoading"
                                  />
                                </div>

                                <div class="col-12 mt-5">
                                  <p class="text-center">
                                    استفاده از اوج آرام به معنای پذیرش
                                    <span class="text-orange"
                                      >شرایط و مقررات</span
                                    >
                                    آن است.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-12" v-if="otpBox">
                              <div
                                class="row d-flex d-flex justify-content-center"
                              >
                                <div class="col-12 mt-5">
                                  <h5
                                    class="text-center"
                                    style="font-weight: bold"
                                  >
                                    ورود به حساب کاربری
                                  </h5>
                                </div>
                                <div
                                  class="col-12 col-lg-8 d-flex justify-content-center flex-column mt-5"
                                >
                                  <div
                                    class="form-group d-flex justify-content-center flex-column"
                                  >
                                    <div class="d-flex justify-content-center">
                                      <label for="">کد ارسالی</label>
                                    </div>
                                    <div
                                      class="d-flex justify-content-center mt-3"
                                      style="direction: ltr !important"
                                    >
                                      <ClientOnly>
                                        <Vue3OtpInput
                                          :num-inputs="5"
                                          input-type="number"
                                          input-classes="otp-input"
                                          :should-auto-focus="true"
                                          @on-change="handleOtpChange"
                                          @on-complete="handleOtpComplete"
                                        />
                                      </ClientOnly>
                                    </div>
                                    <!-- <input
                                      style="
                                        padding: 0.7rem;
                                        border-radius: 15px;
                                        border: 1px solid #f26419;
                                      "
                                      class="form-control mt-2 text-center"
                                      v-model="dataItem.code"
                                      pattern="[0-9]*"
                                      inputmode="numeric"
                                      @input="
                                        $event.target.value =
                                          $event.target.value.replace(
                                            /[^0-9]/g,
                                            ''
                                          )
                                      "
                                    /> -->
                                  </div>
                                </div>

                                <div class="col-12 col-lg-8 mt-3">
                                  <UserButtonLoading
                                    @click="submitOtp()"
                                    :widthStyle="btnLoadingWidth"
                                    :loading="btnLoadingOtp"
                                    :title="textBtnLoading"
                                  />
                                </div>

                                <div class="col-12 mt-5">
                                  <p class="text-center">
                                    استفاده از اوج آرام به معنای پذیرش
                                    <span class="text-orange"
                                      >شرایط و مقررات</span
                                    >
                                    آن است.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="col-12" v-if="userInfoBox">
                              <div
                                class="row d-flex d-flex justify-content-center"
                              >
                                <div class="col-12 mt-5">
                                  <h5
                                    class="text-center"
                                    style="font-weight: bold"
                                  >
                                    ورود به حساب کاربری
                                  </h5>
                                </div>
                                <div
                                  class="col-12 col-lg-6 d-flex justify-content-center flex-column mt-5"
                                >
                                  <div
                                    class="form-group d-flex justify-content-center flex-column"
                                  >
                                    <div class="d-flex justify-content-center">
                                      <label for="">نام</label>
                                    </div>

                                    <input
                                      style="
                                        padding: 0.7rem;
                                        border-radius: 15px;
                                        border: 1px solid #f26419;
                                      "
                                      class="form-control mt-2 text-center"
                                      v-model="dataItemInfo.first_name"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div
                                  class="col-12 col-lg-6 d-flex justify-content-center flex-column mt-5"
                                >
                                  <div
                                    class="form-group d-flex justify-content-center flex-column"
                                  >
                                    <div class="d-flex justify-content-center">
                                      <label for="">نام و نام خانوادگی</label>
                                    </div>

                                    <input
                                      style="
                                        padding: 0.7rem;
                                        border-radius: 15px;
                                        border: 1px solid #f26419;
                                      "
                                      class="form-control mt-2 text-center"
                                      v-model="dataItemInfo.last_name"
                                      type="text"
                                    />
                                  </div>
                                </div>

                                <div class="col-12 col-lg-8 mt-3">
                                  <UserButtonLoading
                                    @click="submitInfo()"
                                    :widthStyle="btnLoadingWidth"
                                    :loading="btnLoadingOtp"
                                    :title="textBtnLoading"
                                  />
                                </div>

                                <div class="col-12 mt-5">
                                  <p class="text-center">
                                    استفاده از اوج آرام به معنای پذیرش
                                    <span class="text-orange"
                                      >شرایط و مقررات</span
                                    >
                                    آن است.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { useAuthStore } from "~/store/auth";
import { ref } from "vue";
import Vue3OtpInput from "vue3-otp-input";
import { useRoute } from "vue-router";
const route = useRoute();

const handleOtpChange = (value) => {
  dataItem.value.code = value;
};

const handleOtpComplete = (value) => {
  dataItem.value.code = value;
  console.log("OTP Complete:", value);
  // submitOtp();
};

const authStore = useAuthStore();
definePageMeta({
  layout: "auth",
});
// می‌تونی اینجا head یا داده‌ها رو ست کنی
useHead({
  title: "صفحه اصلی",
  meta: [{ name: "description", content: "این صفحه اصلی پروژه Nuxt 3 شماست" }],
});

const dataItem = ref({
  mobile: "",
  code: "",
});

const dataItemInfo = ref({
  first_name: "",
  last_name: "",
});

const numberBox = ref(true);
const otpBox = ref(false);

const btnLoading = ref(false);
const btnLoadingOtp = ref(false);
const textBtnLoading = ref("ثبت");
const btnLoadingWidth = ref(true);
const userInfoBox = ref(false);

const { $toastSuccess, $toastError } = useNuxtApp();

const submitNumber = async () => {
  btnLoading.value = true;
  const url = "https://api.doornica.ir/api/v1/authenticate/call-otp";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify(dataItem.value);

  try {
    const serverRespone = await axios.post(url, data, config);
    const serverData = serverRespone;

    $toastSuccess(serverRespone.data.data.message);
    // const resualtToken = await serverData.data.data.accessToken;

    // await useAuthStore().setTokenUser(resualtToken);
    // loadingRedirect.value = true;
    // navigateTo('/masters/home');
    // // location.reload();
    // sleep(200).then(() => {
    //   // router.push('/user/home');
    //   btnLoading.value = false;
    // });
    btnLoading.value = false;
    numberBox.value = false;
    otpBox.value = true;
  } catch (e) {
    console.log(e);
    btnLoading.value = false;
    $toastError(e.response.data.message);
    // errorBox.value = true;
    // console.log(e.response.data.message);
    // errorMessage.value = e.response.data.message;

    // toastErrorLike();
  }
};

const submitOtp = async () => {
  btnLoadingOtp.value = true;
  const url = "https://api.doornica.ir/api/v1/authenticate/confirm-otp";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify(dataItem.value);

  try {
    const serverRespone = await axios.post(url, data, config);
    const serverData = serverRespone;
    const resultToken = serverData.data.data.access_token;
    await authStore.setTokenUser(resultToken);
    $toastSuccess(serverRespone.data.data.message);
    if (serverData.data.data.is_new_user) {
      btnLoading.value = false;
      numberBox.value = false;
      otpBox.value = false;
      userInfoBox.value = true;
    } else {
      // navigateTo("/users");
      const redirectPath = route.query.redirect || "/users";
      navigateTo(redirectPath);
    }

    // loadingRedirect.value = true;

    // // location.reload();
    // sleep(200).then(() => {
    //   // router.push('/user/home');
    //   btnLoading.value = false;
    // });
    btnLoadingOtp.value = false;
  } catch (e) {
    btnLoadingOtp.value = false;
    $toastError(e.response.data.message);

    // errorBox.value = true;
    // console.log(e.response.data.message);
    // errorMessage.value = e.response.data.message;

    // toastErrorLike();
  }
};

const submitInfo = async () => {
  btnLoadingOtp.value = true;
  const url = "https://api.doornica.ir/api/v1/authenticate/update-profile";
  let t = useAuthStore().tokken;
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + t,
    },
  };
  const data = JSON.stringify(dataItemInfo.value);

  try {
    const serverRespone = await axios.post(url, data, config);
    const serverData = serverRespone;
    $toastSuccess(serverRespone.data.data.message);

    navigateTo("/users");

    // loadingRedirect.value = true;

    // // location.reload();
    // sleep(200).then(() => {
    //   // router.push('/user/home');
    //   btnLoading.value = false;
    // });
    btnLoadingOtp.value = false;
  } catch (e) {
    // console.log(e);
    btnLoadingOtp.value = false;
    $toastError(e.response.data.message);
    // errorBox.value = true;
    // console.log(e.response.data.message);
    // errorMessage.value = e.response.data.message;

    // toastErrorLike();
  }
};

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
      //   location.reload();
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

onBeforeMount(() => {
  //   validate()
});
onMounted(() => {});
</script>


<style>
.otp-input {
  padding: 0.7rem;
  width: 52px;
  height: 52px;
  border-radius: 15px;
  border: 1px solid #f26419;
  text-align: center;
  font-size: 1.2rem;
  margin: 0 6px;
}

.otp-input:focus {
  outline: none;
  border-color: #f26419;
  box-shadow: 0 0 0 3px rgba(242, 100, 25, 0.2);
}

@media all and (max-width: 1023px) {
  .otp-input {
    width: 40px !important;
    height: 40px !important;
  }
}
</style>