<!-- ChatMessage.vue -->
<!-- 聊天盒的单个消息 -->

<template>
  <!-- 左侧消息 -->
  <div v-if="message.messageType == MessageType.Left" class="left">
    <!-- 左侧消息头像 -->
    <img class="left-icon" :src="message.icon" alt="">
    <div class="left-name-and-content">
      <!-- 左侧消息昵称 -->
      <div class="left-name">{{ message.name }}</div>
      <!-- 如果左侧消息正在输入中，则显示圆圈 -->
      <WritingCircles v-if="message.isWriting">
      </WritingCircles>
      <!-- 否则显示消息内容 -->
      <template v-else>
        <!-- 如果消息是文本类型，显示对话框 -->
        <div v-if="message.contentType == ContentType.Text" class="left-balloon">
          <div class="left-content">
            {{ message.contentText }}
          </div>
        </div>
        <!-- 否则直接显示图片 -->
        <img v-else class="content-pic">
      </template>
    </div>
  </div>


  <!-- 右侧消息 -->
  <div v-else-if="message.messageType == MessageType.Right" class="right"></div>
</template>

<script setup lang="ts">
import { ContentType } from '@/stores/contact';
import { MessageType, type Message } from '@/stores/contact';
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
  display: inline-block;
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