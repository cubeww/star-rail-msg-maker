<!-- ChatMessageContent.vue -->
<!-- 聊天消息中的“内容”部分，可以是气泡+文字，也可以是图片 -->

<template>
  <!-- 如果消息是文本类型，显示消息气泡+内容 -->
  <div v-if="content.type == MessageContentType.Text" class="balloon" :class="{ 'expand': expand }" ref="balloon">
    <div class="content" ref="textContent">
      {{ (content as MessageContentText).text }}
    </div>
  </div>
  <!-- 如果消息是图片类型，直接显示图片 -->
  <img v-else-if="content.type == MessageContentType.Pic" class="content-pic" :src="(content as MessageContentPic).src">
</template>

<script setup lang="ts">
import { MessageContentType, type MessageContent, type MessageContentText, type MessageContentPic } from '@/stores/contact';
import { type Ref, ref, onMounted } from 'vue';

const { content, expand } = defineProps<{ content: MessageContent, expand: boolean }>()

const textContent: Ref<HTMLElement | null> = ref(null)
const balloon: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  if (textContent.value !== null && balloon.value !== null)
    // 因为要实现动画效果，气泡的宽度需要手动设置
    balloon.value.style.width = textContent.value.clientWidth.toString() + 'px'
})

</script>

<style scoped>
.balloon {
  margin-top: 10px;
  background-color: #ebebeb;

  padding: 10px;
  overflow: hidden;

  /* 此宽度将会在上面代码中设置 */
  width: 0;
}

/* 气泡进入动画：淡入 */
.enter .balloon {
  animation: fade-in 0.5s ease-in-out forwards;
  opacity: 0;
}

/* 气泡进入动画：向右扩张 */
.balloon .expand {
  transition: width 0.25s ease-out;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

/* 聊天气泡圆角 */
.left .balloon {
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.right .balloon {
  background-color: #d4bb8c;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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