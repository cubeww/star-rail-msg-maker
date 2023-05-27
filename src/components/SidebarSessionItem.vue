<!-- SessionItem.vue -->
<!-- 侧边栏中的会话项 -->

<template>
  <div class="session" :class="{ 'appear': isAppeared, 'hover': isHovered, 'click': isClicked, 'select': isSelected() }"
    @click="handleClick" @mousedown="handleMouseDown" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <img src="images/ui/session-icon.png" alt="">
    {{ session.title }}
  </div>
</template>

<script setup lang="ts">
import { useContactStore, type Session } from '@/stores/contact';
import { onMounted, ref } from 'vue';
const contact = useContactStore()

const { session } = defineProps<{
  session: Session
}>()

const isHovered = ref(false)
const isClicked = ref(false)
const isAppeared = ref(false)

const isSelected = () => {
  return session.id === contact.selectedSessionId
}

onMounted(() => {
  // 会话项 出现时淡入效果
  setTimeout(() => {
    isAppeared.value = true
  }, 200);
})


const handleMouseEnter = () => {
  isHovered.value = true

}
const handleMouseLeave = () => {
  isHovered.value = false
  isClicked.value = false
}
const handleMouseDown = () => {
  if (!isSelected())
    isClicked.value = true
}
const handleClick = () => {
  isClicked.value = false
  contact.selectSessionById(session.id)
}

</script>

<style scoped>
.session {
  color: #767879;
  width: 265px;
  height: 35px;
  border: 2px solid;
  border-color: #727273;
  margin: 6px auto;
  background-color: #12171d;
  transition: background-color 0.1s ease-in-out, width 0.1s ease-in-out,
    height 0.1s ease-in-out, color 0.1s ease-in-out;
  display: flex;
  align-items: center;
  font-size: 15px;

  animation: fade-in 0.25s linear forwards, grow 60.0s linear forwards;
  animation-delay: 0.25s, 0s;
  opacity: 0;
  max-height: 0;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

@keyframes grow {
  to {
    max-height: 10000px;
  }
}

.session.appear {}

.session.hover {
  background-color: #cccece;
}

.session.select {
  background-color: #ededed;
  width: 275px;
  height: 40px;
  color: #1a1a1a;
}

.session.click {
  background-color: #ababad;
}

.session img {
  margin: auto 10px;
}
</style>