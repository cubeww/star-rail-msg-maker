<!-- ChatWindow.vue -->
<!-- 完整的聊天窗窗口，包括侧边栏和聊天盒 -->

<template>
  <div class="window">
    <div class="container">
      <div class="title">
        <img src="/images/ui/icon.png" alt=""> &nbsp;&nbsp;
        短信
      </div>
      <ChatSidebar class="sidebar"></ChatSidebar>
      <ChatBox class="chat-box"></ChatBox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ChatBox from '@/components/ChatBox.vue';
import ChatSidebar from '@/components/ChatSidebar.vue';

import { MessageType, MessageDirection, useContactStore } from '@/stores/contact';
const { addUser, addSession, sendMessageText, setSelectEvent, makeOption } = useContactStore()

onMounted(() => {
  const user1 = addUser('三月七', '/images/avatar/三月七.png', '今天也是三月七~')
  const session1 = addSession(user1)
  sendMessageText(session1, MessageDirection.Left, '三月七', '/images/avatar/三月七.png', '你好啊')
  setSelectEvent(session1, MessageType.Text, [
    makeOption('你是谁'),
    makeOption('你为啥要说这个'),
  ])
})

</script>

<style scoped>
.window {
  width: 1280px;
  height: 720px;
  background-color: #1b1e27;
  overflow: hidden;
}

.container {
  opacity: 0;
  animation: fade-in 0.3s ease-in-out forwards;
}

.title {
  padding-left: 32px;
  padding-top: 16px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 15px;
}

.sidebar {
  float: left;
  transform: translateX(-50%);
  animation: move-enter 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.chat-box {
  margin-left: 350px;
  overflow: hidden;
  transform: translateX(50%);
  animation: move-enter 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes move-enter {
  to {
    transform: translateX(0);
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

/* 禁止用户选中文字 */
* {
  -webkit-user-select: none;
  user-select: none;
}
</style>