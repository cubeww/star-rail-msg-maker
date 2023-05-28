<!-- WritingCircles.vue -->
<!-- 写消息时的三个闪烁的圆点 -->

<template>
  <div class="container">
    <div class="circle first"></div>
    <div class="circle second"></div>
    <div class="circle third"></div>
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

.circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  display: inline-block;
  animation: blink 2s linear infinite;
  opacity: 0;
}

.circle.first {
  animation-delay: 0;
}

.circle.second {
  animation-delay: 0.2s;
}

.circle.third {
  animation-delay: 0.4s;
}
</style>