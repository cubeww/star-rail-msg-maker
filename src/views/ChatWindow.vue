<!-- ChatWindow.vue -->
<!-- 完整的聊天窗窗口，包括侧边栏和聊天盒 -->

<template>
  <div class="window">
    <div class="title">
      <img src="images/ui/icon.png" alt=""> &nbsp;&nbsp;
      短信
    </div>
    <ChatSidebar class="sidebar"></ChatSidebar>
    <ChatBox class="chat-box"></ChatBox>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import ChatBox from './ChatBox.vue';
import ChatSidebar from './ChatSidebar.vue';

import { ContentType, MessageDirection, useContactStore } from '@/stores';
const { addUser, addSession, sendMessageText, sendMessageSelect, makeOption } = useContactStore()

onMounted(() => {
  const user1 = addUser('三月七', 'images/avatar/三月七.png', '今天也是三月七~')
  const session1 = addSession(user1, 'FIXME')
  sendMessageText(session1, MessageDirection.Left, '你好啊')
  sendMessageSelect(session1, ContentType.Text, [
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
}

.chat-box {
  margin-left: 350px;
  overflow: hidden;
}
</style>