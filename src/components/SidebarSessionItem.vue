<!-- SessionItem.vue -->
<!-- 侧边栏中的会话项 -->

<template>
  <div class="session" :class="{ 'hover': isHovered, 'click': isClicked, 'select': isSelected() }"
    @click="handleClick" @mousedown="handleMouseDown" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <img src="/images/ui/session-icon.png" alt="">
    {{ session.title }}
  </div>
</template>

<script setup lang="ts">
import { useContactStore, type Session } from '@/stores/contact';
import { ref } from 'vue';
const contact = useContactStore()

const { session } = defineProps<{
  session: Session
}>()

const isHovered = ref(false)
const isClicked = ref(false)

const isSelected = () => {
  return session === contact.selectedSession
}

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
  contact.selectSession(session)
}

</script>

<style scoped>
.session {
  color: #767879;
  width: 265px;
  height: 35px;
  border: 2px solid;
  border-color: #727273;
  margin-top: 6px;
  background-color: #12171d;
  transition: background-color 0.1s ease-in-out, width 0.1s ease-in-out,
    height 0.1s ease-in-out, color 0.1s ease-in-out;
  animation: fade-in 0.25s linear forwards, grow 60.0s linear forwards;
  animation-delay: 0.25s, 0s;
  opacity: 0;
  max-height: 0;

  display: flex;
  align-items: center;
  font-size: 15px;
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