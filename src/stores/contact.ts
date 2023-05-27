import { nanoid } from "nanoid"
import { defineStore } from "pinia"
import { reactive } from "vue"

export interface Contact {
  users: User[]
  sessions: Session[]
  selectedUser: User | null
  selectedSession: Session | null
}

export interface User {
  id: string
  name: string
  icon: string
  desc: string
  sessions: Session[]
}

export interface Session {
  user: User
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
      selectedSession: null,
      selectedUser: null,
    }
  },
  actions: {
    // ------------------------ 联系人数据操作函数 ------------------------

    // 添加一个用户，并返回新用户
    addUser(name: string, icon: string, desc: string) {
      const user: User = reactive({
        id: nanoid(),
        name,
        icon,
        desc,
        sessions: [],
      })
      this.users.push(user)
      return user
    },

    // 给定用户，添加一个会话，并返回新会话
    addSession(user: User) {
      const session: Session = reactive({
        user,
        id: nanoid(),
        title: "",
        messages: [],
      })

      // 向用户的会话id列表中加入新创建的会话id
      user.sessions.push(session)

      return session
    },

    // 给定会话、消息位置、文本内容，发送文本信息，返回消息
    sendMessageText(session: Session, dir: MessageDirection, text: string) {
      const msg: Message = reactive({
        id: nanoid(),
        messageType: dir as number,
        contentOptions: null,
        contentSrc: null,
        contentText: text,
        contentType: ContentType.Text,
      })
      session.messages.push(msg)
      return msg
    },

    // 给定会话id、消息位置、文本内容、图片位置，发送图片信息，返回消息id
    // 文本内容仅用于显示在会话框处
    sendMessagePic(
      session: Session,
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
      session.messages.push(msg)
      return msg
    },

    // 给定会话id、选项内容类型、选项内容，发送选项信息
    sendMessageSelect(
      session: Session,
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
      session.messages.push(msg)
      return msg
    },

    // 创建一个选项对象
    makeOption(content: string) {
      const op: SelectOption = { id: nanoid(), content }
      return op
    },

    // ------------------------ 交互类函数 ------------------------

    // 如果没有选中用户，则选中用户；否则，将当前用户设为null
    selectUser(user: User) {
      if (this.selectedUser != user) {
        this.selectedUser = user
      } else {
        this.selectedUser = null
      }
    },

    // 如果没有选中会话，则选中会话
    selectSession(session: Session) {
      this.selectedSession = session
    },
  },
  getters: {
    isUserSelected: (state) => {
      return state.selectedUser !== null
    },
    isSessionSelected: (state) => {
      return state.selectedSession !== null
    },
  },
})
