<!-- ChatMessage.vue -->
<!-- 聊天盒的单个消息 (Normal型) -->

<template>
  <div class="message-container" v-if="message.direction == MessageDirection.Left">
    <!-- 消息头像 -->
    <img class="avatar" :src="message.icon" alt="">
    <div class="name-and-content">
      <!-- 消息昵称 -->
      <div class="name">{{ message.name }}</div>
      <!-- 如果消息正在输入中，则显示圆圈 -->
      <template v-if="message.isWriting">
        <WritingCircles></WritingCircles>
      </template>
      <!-- 否则显示消息内容 -->
      <template v-else>
        <!-- 如果消息是文本类型，显示消息气泡+内容 -->
        <div v-if="message.type == MessageType.Text" class="balloon" ref="balloon">
          <div class="content" ref="textContent">
            {{ (message as MessageText).text }}
          </div>
        </div>
        <!-- 如果消息是图片类型，直接显示图片 -->
        <img v-else-if="message.type == MessageType.Pic" class="content-pic" :src="(message as MessagePic).src">
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageType, type Message, MessageDirection, type MessageText, type MessagePic } from '@/stores/contact';
import WritingCircles from './WritingCircles.vue'
import { onMounted, ref, type Ref } from 'vue';

const { message } = defineProps<{ message: Message }>()
const balloon: Ref<HTMLElement | null> = ref(null)
const textContent: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  if (balloon.value !== null && textContent.value !== null) {
    // 实现消息出现时的扩展特效
    balloon.value.style.width = textContent.value.clientWidth.toString() + 'px'
    balloon.value.style.opacity = "1"
  }
})

</script>

<style scoped>
.message-container {
  margin-top: 10px;
  margin-bottom: 20px;

  width: 400px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.avatar {
  margin-right: 8px;
}

.name-and-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.name {
  color: #7b7b7b;
  vertical-align: top;
}

.balloon {
  margin-top: 10px;
  background: linear-gradient(to bottom, #ebebeb 0%, #ebebeb 100%);
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  width: 0;
  opacity: 0;
  transition: width 0.5s ease-out, opacity 0.5s ease-in-out;
  overflow: hidden;
}

.content {
  /* 将宽度设为仅与文字内容有关，方便过渡特效控制 */
  width: max-content;
  max-width: 200px;
}

.content-pic {
  width: 150px;
  height: 150px;
  margin: 20px;
}
</style>