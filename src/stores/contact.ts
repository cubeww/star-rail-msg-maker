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
  avatar: string
  desc: string
  sessions: Session[]
}

export interface Session {
  user: User
  id: string
  title: string
  messages: Message[]
  selectEvent: SelectEvent | null
}

export interface Message {
  id: string
  direction: MessageDirection
  name: string
  avatar: string
  content: MessageContent | null // content为null 代表“输入中”状态
}

export interface MessageContent {
  type: MessageContentType
}

export interface MessageContentText {
  type: MessageContentType.Text
  text: string
}

export interface MessageContentPic {
  type: MessageContentType.Pic
  text: string // 图片类型的内容也要在侧边栏显示消息文字，所以保留text属性
  src: string
}

export enum MessageContentType {
  Text,
  Pic,
}

export interface SelectEvent {
  id: string
  options: SelectOption[]
  type: MessageContentType
}

export enum MessageDirection {
  Left = 0,
  Right = 1,
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
    addUser(name: string, avatar: string, desc: string) {
      const user: User = reactive({
        id: nanoid(),
        name,
        avatar,
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
        selectEvent: null,
      })

      // 向用户的会话id列表中加入新创建的会话id
      user.sessions.push(session)

      return session
    },

    // 给定会话、消息位置、发送空白消息，可以在以后将消息内容替换成正常内容
    sendMessageWriting(
      session: Session,
      direction: MessageDirection,
      name: string,
      avatar: string,
    ) {
      const msg: Message = reactive({
        id: nanoid(),
        name,
        direction,
        avatar,
        content: null,
      })
      session.messages.push(msg)
      return msg
    },

    // 给定会话、消息位置、文本内容，发送文本信息，返回消息
    sendMessageText(
      session: Session,
      direction: MessageDirection,
      name: string,
      avatar: string,
      text: string
    ) {
      const msg: Message = reactive({
        id: nanoid(),
        name,
        direction,
        avatar,
        content: {
          type: MessageContentType.Text,
          text,
        } as MessageContentText,
      })
      session.messages.push(msg)
      return msg
    },

    // 给定会话id、消息位置、文本内容、图片位置，发送图片信息，返回消息id
    // 文本内容仅用于显示在会话框处
    sendMessagePic(
      name: string,
      avatar: string,
      session: Session,
      direction: MessageDirection,
      text: string,
      src: string
    ) {
      const msg: Message = reactive({
        id: nanoid(),
        direction,
        avatar,
        name,
        content: {
          type: MessageContentType.Pic,
          text,
          src,
        } as MessageContentPic,
      })
      session.messages.push(msg)
      return msg
    },

    // 给定会话id、选项内容类型、选项内容，设置选项事件
    setSelectEvent(
      session: Session,
      type: MessageContentType,
      options: SelectOption[]
    ) {
      const ev: SelectEvent = reactive({
        id: nanoid(),
        options,
        type,
      })
      session.selectEvent = ev
      return ev
    },

    // 创建一个选项对象
    makeOption(content: string) {
      const op: SelectOption = reactive({ id: nanoid(), content })
      // 我们原神怎么你了？
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
    // 返回用户是否被选择了
    isUserSelected: (state) => {
      return state.selectedUser !== null
    },

    // 返回会话是否被选择了
    isSessionSelected: (state) => {
      return state.selectedSession !== null
    },
  },
})
