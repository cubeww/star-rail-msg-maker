<!-- ChatSidebar.vue -->
<!-- 聊天窗口的左侧侧边栏，可以选联系人 -->

<template>
  <div class="sidebar">
    <div class="contacts">
      <template v-for="user in contact.users" :key="user.id">
        <!-- 1. 联系人盒子本体 -->
        <div class="user" @click="selectUserById(user.id)" @mouseenter="setUserState(user, UserState.Hover)"
        @mouseleave="setUserState(user, UserState.)">
          <img class="avatar" :src="user.icon" alt=""> {{ user.name }}
          <img class="arrow" src="images/ui/arrow.png" alt="">
        </div>

        <!-- 2. 仅当联系人选中时，下面出现的会话列表 -->
        <template v-if="contact.selectedUserId == user.id">
          <div v-for="session in getSessionsByUserId(user.id)" :key="session.id">
            {{ session.title }}
          </div>
        </template>

      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContactStore, type User, type UserState } from '@/stores';
const { contact, getSessionsByUserId, selectUserById, setUserState } = useContactStore()

</script>

<style scoped>
.sidebar {
  width: 360px;
  height: 620px;
  padding-left: 32px;
  box-sizing: border-box;
}

.contacts {
  margin-top: 20px;
  width: 290px;
  height: 550px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.contacts::-webkit-scrollbar {
  width: 0;
}

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
</style>