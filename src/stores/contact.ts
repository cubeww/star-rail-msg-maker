import { nanoid } from "nanoid"
import { defineStore } from "pinia"

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

export const useContactStore = defineStore("contact", {
  state: (): Contact => {
    return {
      users: [],
      sessions: [],
      selectedSessionId: null,
      selectedUserId: null,
    }
  },
  actions: {
    // ------------------------ 联系人数据操作函数 ------------------------

    // 添加一个用户，返回它的id
    addUser(name: string, icon: string, desc: string) {
      const user: User = {
        id: nanoid(),
        name,
        icon,
        desc,
        sessionIds: [],
      }
      this.users.push(user)
      return user.id
    },

    // 给定用户Id，添加一个会话，并返回新会话id
    addSession(userId: string) {
      const session: Session = {
        userId,
        id: nanoid(),
        title: "",
        messages: [],
      }

      // 向用户的会话id列表中加入新创建的会话id
      this.getUserById(userId)?.sessionIds.push(session.id)

      this.sessions.push(session)
      return session.id
    },

    // 给定会话id、消息位置、文本内容，发送文本信息，返回消息id
    sendMessageText(sessionId: string, dir: MessageDirection, text: string) {
      const msg: Message = {
        id: nanoid(),
        messageType: dir as number,
        contentOptions: null,
        contentSrc: null,
        contentText: text,
        contentType: ContentType.Text,
      }
      this.getSessionById(sessionId)?.messages.push(msg)
      return msg.id
    },

    // 给定会话id、消息位置、文本内容、图片位置，发送图片信息，返回消息id
    // 文本内容仅用于显示在会话框处
    sendMessagePic(
      sessionId: string,
      dir: MessageDirection,
      text: string,
      src: string
    ) {
      const msg: Message = {
        id: nanoid(),
        messageType: dir as number,
        contentOptions: null,
        contentSrc: src,
        contentText: text,
        contentType: ContentType.Pic,
      }
      this.getSessionById(sessionId)?.messages.push(msg)
      return msg.id
    },

    // 给定会话id、选项内容类型、选项内容，发送选项信息
    sendMessageSelect(
      sessionId: string,
      cttType: ContentType,
      options: SelectOption[]
    ) {
      const msg: Message = {
        id: nanoid(),
        messageType: MessageType.Select,
        contentOptions: options,
        contentSrc: null,
        contentText: null,
        contentType: cttType,
      }
      this.getSessionById(sessionId)?.messages.push(msg)
      return msg.id
    },

    // 创建一个选项对象
    makeOption(content: string) {
      const op: SelectOption = { id: nanoid(), content }
      return op
    },

    // ------------------------ 交互类函数 ------------------------

    // 如果没有选中用户，则选中用户；否则，将当前用户设为null
    selectUserById(userId: string) {
      if (this.selectedUserId != userId) {
        this.selectedUserId = userId
      } else {
        this.selectedUserId = null
      }
    },

    // 如果没有选中会话，则选中会话
    selectSessionById(sessionId: string) {
      this.selectedUserId = this.getSessionById(sessionId)?.userId!
      this.selectedSessionId = sessionId
    },

    // ------------------------ 查阅类函数 ------------------------

    // 根据用户id获取用户对象
    getUserById(id: string) {
      return this.users.find((u) => u.id == id)
    },

    // 根据会话id获取会话对象
    getSessionById(id: string) {
      return this.sessions.find((u) => u.id == id)
    },

    // 根据用户id获取会话数组
    getSessionsByUserId(userId: string) {
      return this.sessions.filter((s) => s.userId == userId)
    },
  },
  getters: {
    selectedUser: (state) => {
      return state.users.find((u: User) => u.id == state.selectedUserId)!
    },

    selectedSession: (state) => {
      return state.sessions.find((s: Session) => s.id == state.selectedSessionId)!
    },
  },
})
