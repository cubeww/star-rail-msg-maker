<!-- ChatMessage.vue -->
<!-- 聊天盒的单个消息，包括头像、名称、内容 -->

<template>
  <div class="message-container" ref="container" :class="{
    'left': message.direction == MessageDirection.Left,
    'right': message.direction == MessageDirection.Right,
    'enter': message.playEnterAnim,
  }">
    <!-- 消息头像 -->
    <img class="avatar" :src="message.avatar" alt="">
    <div class="name-and-content">
      <!-- 消息昵称 -->
      <div class="name">{{ message.name }}</div>
      <!-- 如果消息正在输入中，则显示圆圈 -->
      <template v-if="message.content === null">
        <WritingCircles></WritingCircles>
      </template>
      <!-- 否则显示消息内容 -->
      <template v-else>
        <!-- expand代表是否启用消息气泡出现时的“扩张动画”
          通常只有Left（对方）发送消息时需要显示扩张动画 -->
        <ChatMessageContent :content="message.content" :expand="message.direction == MessageDirection.Left">
        </ChatMessageContent>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Message, MessageDirection } from '@/stores/contact';

import WritingCircles from './WritingCircles.vue'
import ChatMessageContent from './ChatMessageContent.vue'

const { message } = defineProps<{ message: Message }>()

</script>

<style scoped>
.message-container {
  margin-top: 10px;
  margin-bottom: 20px;

  width: 95%;

  display: flex;
  align-items: flex-start;
  flex-direction: row;
}

/* 让己方消息按主轴相反方向排列 */
.right {
  flex-direction: row-reverse;
}

.avatar {
  width: 55px;
  height: 55px;
}

.name-and-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
  margin-right: 16px;
}

/* 让己方名称和内容靠右（侧轴反向） */
.right .name-and-content {
  align-items: flex-end;
}

.name {
  color: #7b7b7b;
  vertical-align: top;
}

/* 动画部分 */

/* 消息整体进入动画：弹跳+淡入 */
.message-container.enter {
  animation: message-enter 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53) forwards;
  transform: translateY(15px);
}

@keyframes message-enter {
  to {
    transform: translateY(0);
  }
}

/* 头像进入动画：淡入 */
.enter .avatar {
  opacity: 0;
  animation: fade-in 0.5s ease-in-out forwards;
}

/* 名称和内容进入动画：淡入 */
.enter .name-and-content {
  opacity: 0;
  animation: fade-in 0.5s ease-in-out forwards;
  animation-delay: 0.25s;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>