<script setup lang="ts">
// const props = defineProps({
//   loading: {
//     type: Boolean,
//     default: true
//   }
// });
</script>

<template>
    <!-- v-if="props.loading" -->
  <div
   
    class="loading-overlay"
  >
    <div class="spinner-border" role="status"></div>
  </div>
</template>

<style scoped>
.loading-overlay {
  background-color: white;
  width: 100%;
  height: 100%;
  z-index: 10000;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
}

.loading-overlay {
    animation: fadeOut 1s ease forwards;
    animation-delay: 1.5s; /* بعد از ۱ ثانیه محو شه */
  }


  @keyframes fadeOut {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
</style>
