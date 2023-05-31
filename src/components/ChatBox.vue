<!-- ChatBox.vue -->
<!-- 聊天窗口右侧的聊天盒，显示消息的地方 -->

<template>
  <div class="chat-box" :class="{ 'empty': !contact.isSessionSelected, 'has': contact.isSessionSelected }">
    <!-- 没有选中会话时，显示空白图片 -->
    <div v-if="!contact.isSessionSelected">
      <img src="/images/ui/chat-empty.png" alt="">
      <div>请选择联系人</div>
    </div>

    <!-- 选中会话时，显示聊天内容容器 -->
    <template v-else>
      <!-- 聊天会话需要保留一些状态（如滚动的位置），
        所以添加keep-alive标签 -->
      <keep-alive>
        <ChatContainer :session="contact.selectedSession!" :key="contact.selectedSession!.id"></ChatContainer>
      </keep-alive>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useContactStore } from '@/stores/contact';
import ChatContainer from './ChatContainer.vue';

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
}
</style>