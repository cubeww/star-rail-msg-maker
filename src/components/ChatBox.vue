<!-- ChatBox.vue -->
<!-- 聊天窗口右侧的聊天盒，显示消息的地方 -->

<template>
  <div class="chat-box" :class="{ 'empty': !contact.isSessionSelected, 'has': contact.isSessionSelected }">
    <div v-if="!contact.isSessionSelected">
      <img src="/images/ui/chat-empty.png" alt="">
      <div>请选择联系人</div>
    </div>
    <div v-else class="container">
      <!-- 顶部联系人名字和描述 -->
      <div class="header">
        <div class="header-name">{{ contact.selectedUser?.name }}</div>
        <div class="header-desc">{{ contact.selectedUser?.desc }}</div>
      </div>

      <hr class="header-hr">

      <!-- 中部消息列表 -->
      <div class="messages">
        <ChatMessage v-for="msg in contact.selectedSession?.messages" :message="msg"></ChatMessage>
      </div>

      <!-- <hr class="footer-hr"> -->

      <!-- 底部选项选择框 -->
      <div class="footer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContactStore } from '@/stores/contact';
import ChatMessage from './ChatMessage.vue';
const contact = useContactStore()

</script>

<style scoped>
.chat-box {
  width: 900px;
  height: 620px;
  margin-top: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
}

/* 未选中会话时的样式 */
.chat-box.empty {
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  color: #989898;
}

/* 选中会话时的样式 */
.chat-box.has {
  background-color: #d4d4d4;
  display: flex;
  flex-direction: column;
}

.container {
  opacity: 0;
  animation: fade-in 0.5s ease-in-out forwards
}

.header {
  height: 55px;
  padding-top: 20px;
  padding-left: 30px;
  transform: translateX(30px);
  animation: header-enter 0.3s ease-in-out forwards;
}

@keyframes header-enter {
  to {
    transform: translateX(0);
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

.header-name {
  font-size: 18px;
  color: black;
}

.header-desc {
  margin-top: 3px;
  font-size: 14px;
  color: #767676;
}

.header-hr {
  background-color: #adadaf;
  border: none;
  height: 1px;
  margin: 0;
  box-shadow: 0 0px 10px 10px #d4d4d6;
  position: relative;
  width: 98%;
  margin-top: 10px;
}

.messages {
  margin-left: 40px;
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 500px;
  height: auto;
  flex-grow: 2;
}

.messages::-webkit-scrollbar {
  width: 3px;
}

.messages::-webkit-scrollbar-track {
  background: #c2c4c4;
}

.messages::-webkit-scrollbar-thumb {
  background: #545454;
}

.messages::-webkit-scrollbar-thumb:hover {
  background: #545454;
}

.footer {
  position: relative;
  background-color: #cbcbcb;
  max-height: 0px;
  transition: max-height 1.5s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.25s ease-in-out;
  opacity: 0;
  overflow: hidden;
  flex-shrink: 0;
  min-height: 10px;
}

.messages-finish-hr {
  background-color: #adadaf;
  border: none;
  height: 1px;
  margin-bottom: 20px;
  width: 98%;
  margin-left: 0;
}

.footer.expand {
  max-height: 300px;
  opacity: 1;
}

.footer-hr {
  background-color: #adadaf;
  border: none;
  height: 1px;
  margin: 0;
  position: relative;
  width: 100%;
}
</style>