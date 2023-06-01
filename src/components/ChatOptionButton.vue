<!-- ChatOptionButton.vue -->
<!-- 聊天盒的选项按钮 -->

<template>
  <div class="option" :class="{ 'hover': isHovered, 'click': isClicked }" @click="handleClick"
    @mousedown="handleMouseDown" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    {{ option.content }}
  </div>
</template>

<script setup lang="ts">
import type { SelectOption } from '@/stores/contact';
import { ref } from 'vue';

const { option } = defineProps<{ option: SelectOption }>()

import { useContactStore } from '@/stores/contact';
const contact = useContactStore()

const isHovered = ref(false)
const isClicked = ref(false)

const canHandle = ref(true)

const handleMouseEnter = () => {
  if (!canHandle) return

  isHovered.value = true

}
const handleMouseLeave = () => {
  if (!canHandle) return

  isHovered.value = false
  isClicked.value = false
}
const handleMouseDown = () => {
  if (!canHandle) return

  isClicked.value = true
}
const handleClick = () => {
  if (!canHandle) return

  canHandle.value = false

  setTimeout(() => {
    contact.selectedSession!.showSelectEvent = false
  }, 100);
}
</script>

<style scoped>
.option {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #e9e9e9;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  transition: background-color 0.1s ease-in-out;
}

.option.hover {
  background-color: #f4f4f4;
}

.option.click {
  background-color: #9b9b9b;
}
</style>