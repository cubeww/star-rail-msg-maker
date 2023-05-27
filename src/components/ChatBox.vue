<!-- ChatBox.vue -->
<!-- 聊天窗口右侧的聊天盒，显示消息的地方 -->

<template>
  <div class="chat-box" :class="{ 'empty': isEmpty(), 'has': !isEmpty() }">
    <div v-if="isEmpty()">
      <img src="images/ui/chat-empty.png" alt="">
      <div>请选择联系人</div>
    </div>
    <div v-else class="container">
      <div class="header">
        <div class="header-name">{{ contact.selectedUser.name }}</div>
        <div class="header-desc">{{ contact.selectedUser.desc }}</div>
      </div>
      <div class="messages">

      </div>
      <div class="input">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContactStore } from '@/stores/contact';
import { computed } from 'vue';
const contact = useContactStore()

const isEmpty = () => {
  return contact.selectedSessionId === null
}

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

.messages {}

.input {}
</style>