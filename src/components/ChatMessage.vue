<!-- ChatMessage.vue -->
<!-- 聊天盒的单个消息 (Normal型) -->

<template>
  <!-- 左侧消息 -->
  <div v-if="message.direction == MessageDirection.Left" class="left">
    <!-- 左侧消息头像 -->
    <img class="left-icon" :src="message.icon" alt="">
    <div class="left-name-and-content">
      <!-- 左侧消息昵称 -->
      <div class="left-name">{{ message.name }}</div>
      <!-- 如果左侧消息正在输入中，则显示圆圈 -->
      <template v-if="message.isWriting">
        <WritingCircles></WritingCircles>
      </template>
      <!-- 否则显示消息内容 -->
      <template v-else>
        <!-- 如果消息是文本类型，显示消息气泡+内容 -->
        <div v-if="message.type == MessageType.Text" class="left-balloon">
          <div class="left-content">
            {{ (message as MessageText).text }}
          </div>
        </div>
        <!-- 如果消息是图片类型，直接显示图片 -->
        <img v-else-if="message.type == MessageType.Pic" class="content-pic" :src="(message as MessagePic).src">
      </template>
    </div>
  </div>


  <!-- 右侧消息 -->
  <div v-else class="right"></div>
</template>

<script setup lang="ts">
import { MessageType, type Message, MessageDirection, type MessageText, type MessagePic } from '@/stores/contact';
import WritingCircles from './WritingCircles.vue'

const { message } = defineProps<{ message: Message }>()
</script>

<style scoped>
.left {
  padding-top: 10px;
  padding-bottom: 20px;
}

.left-icon {
  vertical-align: top;
}

.left-name-and-content {
  display: inline-block;
  max-width: 300px;
}

.left-name {
  display: inline;
  color: #7b7b7b;
  margin-left: 10px;
  vertical-align: top;
}

.left-balloon {
  margin-top: 10px;
  margin-left: 10px;
  background: linear-gradient(to bottom, #ebebeb 0%, #ebebeb 100%);
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.left-content {}

.content-pic {
  width: 150px;
  height: 150px;
  margin: 20px;
}
</style>