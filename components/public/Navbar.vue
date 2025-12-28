<template>
  <div>
    <nav
      class="navbar navbar-expand-lg"
      style="background-color: white !important"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <!-- <img src="./assets/images/logo.webp" class="img-fluid" style="height: 3rem;" alt=""> -->
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fi fi-rr-bars-sort"></i>
        </button>
        <div
          class="collapse navbar-collapse"
          style="background-color: white"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item px-2">
              <a class="nav-link active" aria-current="page" href="#">خانه</a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link menu-item" href="#">تورها</a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link menu-item" href="#">ویزا و اقامت</a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link menu-item" href="#">خدمات سفارت</a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link menu-item" href="/hotels">هتل</a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link menu-item" href="#">پرواز</a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link menu-item" href="#">تور نوروز</a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link menu-item" href="#">تور کریسمس</a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link menu-item" href="#">ارتباط با ما</a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link menu-item" href="#">درباره ما</a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link menu-item" href="#">مجله گردشگری</a>
            </li>
          </ul>
          <ul v-if="!isLogin" class="navbar-nav me-auto mb-2 mb-lg-0">
            <NuxtLink to="/login" class="text-orange"
              ><i
                class="fi fi-rr-user mx-2 text-orange mt-1"
                style="font-size: 1.5rem"
              ></i
              >ورود / ثبت نام
            </NuxtLink>
          </ul>
          <ul v-if="isLogin" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-orange"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="openDropDown()"
              >
                {{ dataItem?.user?.mobile
                }}<i
                  class="fi fi-rr-user mx-2 text-orange mt-1"
                  style="font-size: 1.5rem"
                ></i>
              </a>
              <div
                class="dropdown-menu show"
                v-if="dropDownOpen"
                aria-labelledby="navbarDropdown"
                style="margin-right: -2rem !important; padding: 1rem"
              >
                <NuxtLink
                  v-if="dataItem.is_admin"
                  class="dropdown-item text-right"
                  style="padding-right: 0 !important"
                  href="#"
                >
                  <img
                    src="/assets/images/icons/insert-alt.png"
                    class="img-fluid mx-2"
                    style="height: 1rem"
                    alt=""
                  />

                  ورود به پنل ادمین
                </NuxtLink>
                <NuxtLink
                  v-else
                  class="dropdown-item text-right"
                  style="padding-right: 0 !important"
                  to="/users"
                >
                  <img
                    src="/assets/images/icons/insert-alt.png"
                    class="img-fluid mx-2"
                    style="height: 1rem"
                    alt=""
                  />
                  ورود به پنل کاربری
                </NuxtLink>

                <div class="dropdown-divider"></div>
                <a
                  class="dropdown-item text-danger text-right"
                  style="padding-right: 0 !important"
                  @click="logout()"
                >
                  <img
                    src="/assets/images/icons/sign-out-alt.png"
                    class="img-fluid mx-2"
                    style="height: 1rem"
                    alt=""
                  />

                  خروج
                </a>
              </div>
            </li>
            <span class="text-orange"> </span>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const { $toastSuccess, $toastError } = useNuxtApp();
import axios from "axios";
import { useAuthStore } from "~/store/auth";

const megaMenu = ref(false);

const navbarRef = ref(null);
const megaMenuRef = ref(null);
const dropDownOpen = ref(false);

const dataItem = ref([]);

const isLogin = ref(false);

const toggleMegaMenu = () => {
  megaMenu.value = !megaMenu.value;
};

const closeMegaMenu = () => {
  megaMenu.value = false;
};

const logout = () => {
  const authStore = useAuthStore();

  authStore.logout();
  navigateTo("/");
  dropDownOpen.value = false;

  $toastSuccess("با موفقیت از حساب کاربری خارج شدید");
  // validate();
};

const openDropDown = () => {
  dropDownOpen.value = !dropDownOpen.value;
};

const handleClickOutside = (e) => {
  if (
    megaMenu.value &&
    !navbarRef.value.contains(e.target) &&
    !megaMenuRef.value.contains(e.target)
  ) {
    closeMegaMenu();
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
      isLogin.value = true;
      dataItem.value = serverResponse.data;
      console.log(isLogin.value);

      // showLoading.value = false;
      return true;
    }
  } catch (e) {
    return false;
  }
};

onMounted(() => {
  validate();
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  max-height: 80px;

  background: rgba(255, 255, 255, 0.11);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.6px);
  -webkit-backdrop-filter: blur(6.6px);
}
/* افکت Blur روی همه چیز به جز Navbar و Mega Menu */
.blur-active {
  position: relative;
}
.blur-active::before {
  content: "";
  position: fixed;
  top: 56px; /* ارتفاع navbar */
  left: 0;
  width: 100%;
  height: calc(100% - 56px);
  filter: blur(8px);

  background: rgba(0, 0, 0, 0.226);
  backdrop-filter: blur(5px);
  z-index: 998;
}

/* Mega Menu فول‌ویث Fixed */
.mega-menu {
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100%;

  background: white;
  padding: 2rem 1rem;
  z-index: 999;
  opacity: 0;
  /* 
  transform: translateY(-10px);
  background: rgba(20, 20, 20, 0.11);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  */
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.mega-menu.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.accordion-button::after {
  display: none;
}
</style>
