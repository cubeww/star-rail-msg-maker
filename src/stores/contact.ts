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
  selectEvent: SelectEvent | null
}

export interface Message {
  type: MessageType
  id: string
  direction: MessageDirection
  name: string
  icon: string
  isWriting: boolean
}

export interface MessageText extends Message {
  type: MessageType.Text
  text: string
}

export interface MessagePic extends Message {
  type: MessageType.Pic
  text: string
  src: string
}

export interface SelectEvent {
  id: string
  options: SelectOption[]
  type: MessageType
}

export enum MessageDirection {
  Left = 0,
  Right = 1,
}

export enum MessageType {
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
        selectEvent: null,
      })

      // 向用户的会话id列表中加入新创建的会话id
      user.sessions.push(session)

      return session
    },

    // 给定会话、消息位置、文本内容，发送文本信息，返回消息
    sendMessageText(
      session: Session,
      direction: MessageDirection,
      name: string,
      icon: string,
      text: string
    ) {
      const msg: MessageText = reactive({
        id: nanoid(),
        type: MessageType.Text,
        name,
        isWriting: false,
        direction,
        icon,
        text,
      })
      session.messages.push(msg)
      return msg
    },

    // 给定会话id、消息位置、文本内容、图片位置，发送图片信息，返回消息id
    // 文本内容仅用于显示在会话框处
    sendMessagePic(
      name: string,
      icon: string,
      session: Session,
      direction: MessageDirection,
      text: string,
      src: string
    ) {
      const msg: MessagePic = reactive({
        id: nanoid(),
        type: MessageType.Pic,
        direction,
        icon,
        isWriting: false,
        name,
        src,
        text,
      })
      session.messages.push(msg)
      return msg
    },

    // 给定会话id、选项内容类型、选项内容，设置选项事件
    setSelectEvent(
      session: Session,
      type: MessageType,
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
