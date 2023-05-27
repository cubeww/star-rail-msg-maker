<!-- UserItem.vue -->
<!-- 侧边栏的联系人用户项 -->

<template>
  <!-- 联系人盒子本体 -->
  <div class="user" :class="{ 'hover': isHovered, 'click': isClicked, 'select': isSelected() }" @click="handleClick"
    @mousedown="handleMouseDown" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <img class="avatar" :src="user.icon" alt=""> {{ user.name }}
    <img class="arrow" :class="{ 'hover': isHovered, 'select': isSelected() }" src="images/ui/arrow.png" alt="">
  </div>
  <!-- 仅当联系人选中时，下面出现的会话列表 -->
  <template v-if="isSelected()">
    <template v-for="session in user.sessions" :key="session.id">
      <SidebarSessionItem :session="session"></SidebarSessionItem>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useContactStore, type User } from '@/stores/contact';
import { ref } from 'vue';
import SidebarSessionItem from './SidebarSessionItem.vue';
const contact = useContactStore()

const { user } = defineProps<{
  user: User
}>()

const isHovered = ref(false)
const isClicked = ref(false)

const isSelected = () => {
  return user === contact.selectedUser
}

const handleMouseEnter = () => {
  isHovered.value = true
}
const handleMouseLeave = () => {
  isHovered.value = false
  isClicked.value = false
}
const handleMouseDown = () => {
  isClicked.value = true
}
const handleClick = () => {
  isClicked.value = false
  contact.selectUser(user)
}

</script>

<style scoped>
.user {
  width: 290px;
  height: 64px;
  border: 2px solid;
  border-color: #727273;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: #ababad;
  padding: 10px;
  font-size: 15px;
  background-color: #13141a;
  margin-top: 15px;
  transition: border-color 0.1s ease-in-out, color 0.1s ease-in-out;
}

.user.select {
  border-color: #8c9093;
  color: #bcbec0;
}

.user.hover {
  border-color: #bcbec0;
  color: #f9fcff;
}

.user.click {
  border-color: #727273;
  color: #ababad;
}

.avatar {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}

.arrow {
  margin-left: 150px;
  transition: margin-left 0.1s ease-in-out, transform 0.2s ease-in-out;
}

.arrow.hover {
  margin-left: 155px;
}

.arrow.select {
  transform: rotate(90deg);
}

.arrow.hover {
  margin-left: 155px;
}

.arrow.select {
  transform: rotate(90deg);
}
</style>