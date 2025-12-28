<script lang="ts" setup>
// -------- Import Items -------- -------- --------  -------- -------- -------- //
// -------- Variabels -------- -------- --------  -------- -------- -------- //
const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
    default: '',
  },
  widthStyle: {
    type: Boolean,
    required: true,
    default: false,
  },
});
// -------- Functions -------- -------- --------  -------- -------- -------- //

// -------- Layouts -------- -------- --------  -------- -------- -------- //
// -------- Lifecycle Methods -------- -------- --------  -------- -------- -------- //

// const loading = ref(false);

// const loading = defineProps<{
//   type: Boolean;
//   default: false;
// }>();
</script>

<template>
  <div>
    <button class="btn bg-orange" :class="{ width100: widthStyle }">
      <span class="btn-loading-text " style="color: white !important" v-if="!loading"> {{title}}</span>
      <span class="btn-loading-text" style="color: white !important" v-if="loading">
        لطفا منتظر بمانید
        <div class="spinner-border" style="height: 1.5rem; width: 1.5rem" role="status">
      
        </div>
      </span>
    </button>
  </div>
</template>

<style scoped>
.width100 {
  width: 100%;
}
@keyframes ldio-r6lx93xrq7 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.ldio-r6lx93xrq7 div {
  position: absolute;
  animation: ldio-r6lx93xrq7 1s linear infinite;
  width: 160px;
  height: 160px;
  top: 20px;
  left: 20px;
  border-radius: 50%;
  box-shadow: 0 4px 0 0 #ffffff;
  transform-origin: 80px 82px;
}
.loadingio-spinner-eclipse-dda5au9yrzt {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
}
.ldio-r6lx93xrq7 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-r6lx93xrq7 div {
  box-sizing: content-box;
}

.bg-header-gradiant {
  background: hsla(241, 100%, 13%, 1);

  background: linear-gradient(180deg, hsla(241, 100%, 13%, 1) 0%, hsla(273, 84%, 15%, 1) 100%);

  background: -moz-linear-gradient(180deg, hsla(241, 100%, 13%, 1) 0%, hsla(273, 84%, 15%, 1) 100%);

  background: -webkit-linear-gradient(180deg, hsla(241, 100%, 13%, 1) 0%, hsla(273, 84%, 15%, 1) 100%);

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#010042", endColorstr="#280644", GradientType=1 );
}
</style>
