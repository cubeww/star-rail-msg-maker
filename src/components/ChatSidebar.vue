<!-- ChatSidebar.vue -->
<!-- 聊天窗口的左侧侧边栏，可以选联系人 -->

<template>
  <div class="sidebar">
    <div class="contact-list">
      <template v-for="user in contact.users" :key="user.id">
        <!-- 联系人项 -->
        <SidebarUserItem :user="user"></SidebarUserItem>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContactStore } from '@/stores/contact';
import SidebarUserItem from './SidebarUserItem.vue';
const contact = useContactStore()
</script>

<style scoped>
.sidebar {
  width: 360px;
  height: 620px;
  padding-left: 32px;
  box-sizing: border-box;
}

.contact-list {
  margin-top: 20px;
  width: 290px;
  height: 550px;
  overflow-x: hidden;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-list::-webkit-scrollbar {
  width: 0;
}
</style>