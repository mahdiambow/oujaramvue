<template>
  <div>
    <h1 class="text-center mt-5">به پنل خوش آمدید</h1>
    <h5 class="text-center mt-5">
      شرکت خدمات مسافرتی هوایی و گردشگری اوج آرام
    </h5>
    <p class="text-center mt-5">به زودی ...</p>
    <NuxtLink to="/" class="btn bg-orange mx-2"> ورود به صفحه اصلی </NuxtLink>
    <NuxtLink to="/hotels" class="btn bg-orange mx-2"> ورود به هتل </NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});
// می‌تونی اینجا head یا داده‌ها رو ست کنی
useHead({
  title: "صفحه اصلی",
  meta: [{ name: "description", content: "این صفحه اصلی پروژه Nuxt 3 شماست" }],
});
</script>