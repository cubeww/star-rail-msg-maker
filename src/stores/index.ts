// index.ts
// 用户/会话/消息：数据存储 集中处理

import { nanoid } from "nanoid"
import { defineStore } from "pinia"
import { reactive } from "vue"

export interface Contact {
  users: User[]
  sessions: Session[]
  selectedUserId: string | null
  selectedSessionId: string | null
}

export interface User {
  id: string
  name: string
  icon: string
  desc: string
  sessionIds: string[]

  state: UserState
}

export enum UserState {
  Idle,
  Hover,
  Click,
  Select,
}

export interface Session {
  userId: string
  id: string
  title: string
  messages: Message[]
}

export interface Message {
  id: string

  messageType: MessageType

  contentType: ContentType
  contentText: string | null
  contentSrc: string | null
  contentOptions: SelectOption[] | null
}

export enum MessageType {
  Left = 0,
  Right = 1,
  Select = 2,
}

export enum MessageDirection {
  Left = 0,
  Right = 1,
}

export enum ContentType {
  Text,
  Pic,
}

export interface SelectOption {
  id: string
  content: string
}

export const useContactStore = defineStore("contact", () => {
  // 响应式联系人数据（包括用户、会话、消息）
  const contact = reactive<Contact>({
    users: [],
    sessions: [],
    selectedUserId: null,
    selectedSessionId: null,
  })

  // ------------------------ 联系人数据操作函数 ------------------------

  // 添加一个用户，返回它的id
  const addUser = (name: string, icon: string, desc: string) => {
    const user: User = {
      id: nanoid(),
      name,
      icon,
      desc,
      sessionIds: [],
      state: UserState.Idle,
    }
    contact.users.push(user)
    return user.id
  }

  // 给定用户Id，添加一个会话，并返回新会话id
  const addSession = (userId: string, title: string) => {
    const session: Session = { userId, id: nanoid(), title, messages: [] }

    // 向用户的会话id列表中加入新创建的会话id
    getUserById(userId)?.sessionIds.push(session.id)

    contact.sessions.push(session)
    return session.id
  }

  // 给定会话id、消息位置、文本内容，发送文本信息，返回消息id
  const sendMessageText = (
    sessionId: string,
    dir: MessageDirection,
    text: string
  ) => {
    const msg: Message = {
      id: nanoid(),
      messageType: dir as number,
      contentOptions: null,
      contentSrc: null,
      contentText: text,
      contentType: ContentType.Text,
    }
    getSessionById(sessionId)?.messages.push(msg)
    return msg.id
  }

  // 给定会话id、消息位置、文本内容、图片位置，发送图片信息，返回消息id
  // 文本内容仅用于显示在会话框处
  const sendMessagePic = (
    sessionId: string,
    dir: MessageDirection,
    text: string,
    src: string
  ) => {
    const msg: Message = {
      id: nanoid(),
      messageType: dir as number,
      contentOptions: null,
      contentSrc: src,
      contentText: text,
      contentType: ContentType.Pic,
    }
    getSessionById(sessionId)?.messages.push(msg)
    return msg.id
  }

  // 给定会话id、选项内容类型、选项内容，发送选项信息
  const sendMessageSelect = (
    sessionId: string,
    cttType: ContentType,
    options: SelectOption[]
  ) => {
    const msg: Message = {
      id: nanoid(),
      messageType: MessageType.Select,
      contentOptions: options,
      contentSrc: null,
      contentText: null,
      contentType: cttType,
    }
    getSessionById(sessionId)?.messages.push(msg)
    return msg.id
  }

  // 创建一个选项对象
  const makeOption = (content: string) => {
    const op: SelectOption = { id: nanoid(), content }
    return op
  }

  // ------------------------ 交互类函数 ------------------------

  // 如果没有选中用户，则选中用户；否则，将当前用户设为null
  const selectUserById = (userId: string) => {
    if (contact.selectedUserId != userId) {
      contact.selectedUserId = userId
    } else {
      contact.selectedUserId = null
    }
  }

  // 如果没有选中会话，则选中会话
  const selectSessionById = (sessionId: string) => {
    contact.selectedUserId = getSessionById(sessionId)?.userId!
    contact.selectedSessionId = sessionId
  }

  // 设置用户的UI状态
  const setUserState = (user: User, state: UserState) => {
    user.state = state

    if (user.state == UserState.Click) {
      // 当切换为Click状态时，一段时间后再转为Select状态
      setTimeout(() => {
        user.state = UserState.Select
      }, 250)
    }
  }

  // ------------------------ 查阅类函数 ------------------------

  // 根据用户id获取用户对象
  const getUserById = (id: string) => {
    return contact.users.find((u) => u.id == id)
  }

  // 根据会话id获取会话对象
  const getSessionById = (id: string) => {
    return contact.sessions.find((u) => u.id == id)
  }

  // 根据用户id获取会话数组
  const getSessionsByUserId = (userId: string) => {
    return contact.sessions.filter((s) => s.userId == userId)
  }

  return {
    contact,

    addUser,
    addSession,
    sendMessageText,
    sendMessageSelect,
    sendMessagePic,
    makeOption,

    selectUserById,
    selectSessionById,
    setUserState,

    getUserById,
    getSessionById,
    getSessionsByUserId,
  }
})
