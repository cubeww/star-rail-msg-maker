<!-- WritingCircles.vue -->
<!-- 写消息时的三个闪烁的圆点 -->

<template>
  <div class="container">
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="circle-3"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.container {
  margin-top: 5px;
  margin-left: 13px;
  display: block;
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  33% {
    opacity: 1;
  }

  66% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

.circle-1 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  display: inline-block;
  animation: blink 2s linear infinite;
  animation-delay: 0;
  opacity: 0;
}

.circle-2 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  display: inline-block;
  margin-left: 2px;
  animation: blink 2s linear infinite;
  animation-delay: 0.2s;
  opacity: 0;
}

.circle-3 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  display: inline-block;
  margin-left: 2px;
  animation: blink 2s linear infinite;
  animation-delay: 0.4s;
  opacity: 0;
}
</style>