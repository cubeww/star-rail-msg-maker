<!-- ChatContainer.vue -->
<!-- ChatBox中的内容容器，具备聊天区的全部功能 -->

<template>
  <div class="chat-container">
    <!-- 顶部联系人名字和描述 -->
    <div class="header">
      <div class="header-name">{{ session.user.name }}</div>
      <div class="header-desc">{{ session.user.desc }}</div>
    </div>

    <hr class="header-hr">

    <!-- 中部消息列表 -->
    <div class="messages">
      <template v-for="msg in session.messages" :key="msg.id">
        <ChatMessage :message="msg"></ChatMessage>
      </template>
    </div>

    <!-- <hr class="footer-hr"> -->

    <!-- 底部选项选择框 -->
    <div class="footer">
      <div>你是来拉屎的吧</div>
      <div>你是来拉屎的吧</div>
      <div>你是来拉屎的吧</div>
      <div>你是来拉屎的吧</div>
      <div>你是来拉屎的吧</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Session } from '@/stores/contact';
import ChatMessage from './ChatMessage.vue';
import { onMounted } from 'vue';

const { session } = defineProps<{ session: Session }>()

onMounted(() => {
  console.log('Session is: ' + session.id);
})

</script>

<style scoped>
/* 主容器，采用flex布局增加灵活性 */
.chat-container {
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: fade-in 0.5s ease-in-out forwards;
  height: 100%;
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

/* 中间消息框，可以拉伸，也可以被footer压缩 */
.messages {
  margin-left: 40px;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.messages-finish-hr {
  background-color: #adadaf;
  border: none;
  height: 1px;
  margin-bottom: 20px;
  width: 98%;
  margin-left: 0;
}

/* 消息窗滚轮样式设置 */
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
  transition: max-height 1s ease-out,
    opacity 0.25s ease-in-out;
  opacity: 1;
  overflow: hidden;
  flex-shrink: 0;
}

.footer.expand {
  max-height: 500px;
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