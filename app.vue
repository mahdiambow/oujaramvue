<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// head مشترک برای کل سایت
useHead({
  htmlAttrs: { lang: 'fa' },
  meta: [{ name: 'author', content: 'سید مهدی شیخ' }]
})
</script>

<style>
body {
  font-family: sans-serif;
  margin: 0;
}
</style>
