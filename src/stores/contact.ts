import { defineStore } from "pinia"
import { reactive } from "vue"

export enum ContactEvent {
  OnUserSelected,
  OnSessionSelected,
  OnMessageSent,
  OnOptionSelected,
}

export interface Contact {
  users: User[]
  sessions: Session[]
  selectedUser: User | null
  selectedSession: Session | null
  eventListers: {
    [key in ContactEvent]?: { listener: Object; callback: Function }[]
  }
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
  showSelectEvent: boolean
}

export interface Message {
  id: string
  direction: MessageDirection
  name: string
  avatar: string
  content: MessageContent | null // content为null 代表“输入中”状态
  playEnterAnim: boolean // 当playEnterAnim为true时，消息被**第一次**创建时会播放进入动画
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
  Left,
  Right,
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
      eventListers: {},
    }
  },
  actions: {
    // ------------------------ 联系人数据操作函数 ------------------------

    // 添加一个用户，并返回新用户
    addUser(id: string, name: string, avatar: string, desc: string) {
      const user: User = reactive({
        id,
        name,
        avatar,
        desc,
        sessions: [],
      })
      this.users.push(user)
      return user
    },

    // 给定用户，添加一个会话，并返回新会话
    addSession(user: User, id: string) {
      const session: Session = reactive({
        user,
        id,
        title: "",
        messages: [],
        selectEvent: null,
        showSelectEvent: false,
      })

      // 向用户的会话id列表中加入新创建的会话id
      user.sessions.push(session)

      return session
    },

    // 给定会话、消息位置、发送空白消息，可以在以后将消息内容替换成正常内容
    sendMessageWriting(
      session: Session,
      id: string,
      direction: MessageDirection,
      name: string,
      avatar: string
    ) {
      const msg: Message = reactive({
        id,
        name,
        direction,
        avatar,
        content: null,
        playEnterAnim: true,
      })
      session.messages.push(msg)
      this.emitEvent(ContactEvent.OnMessageSent, msg)
      return msg
    },

    // 给定会话、消息位置、文本内容，发送文本信息，返回消息
    sendMessageText(
      session: Session,
      id: string,
      direction: MessageDirection,
      name: string,
      avatar: string,
      text: string,
      playEnterAnim: boolean = true
    ) {
      const msg: Message = reactive({
        id,
        name,
        direction,
        avatar,
        content: {
          type: MessageContentType.Text,
          text,
        } as MessageContentText,
        playEnterAnim,
      })
      session.messages.push(msg)
      this.emitEvent(ContactEvent.OnMessageSent, msg)
      return msg
    },

    // 给定会话id、消息位置、文本内容、图片位置，发送图片信息，返回消息id
    // 文本内容仅用于显示在会话框处
    sendMessagePic(
      session: Session,
      id: string,
      direction: MessageDirection,
      name: string,
      avatar: string,
      text: string,
      src: string,
      playEnterAnim: boolean = true
    ) {
      const msg: Message = reactive({
        id,
        direction,
        avatar,
        name,
        content: {
          type: MessageContentType.Pic,
          text,
          src,
        } as MessageContentPic,
        playEnterAnim,
      })
      session.messages.push(msg)
      this.emitEvent(ContactEvent.OnMessageSent, msg)
      return msg
    },

    // 给定会话id、选项内容类型、选项内容，设置选项事件
    setSelectEvent(
      session: Session,
      id: string,
      type: MessageContentType,
      options: SelectOption[]
    ) {
      const ev: SelectEvent = reactive({
        id,
        options,
        type,
      })
      session.selectEvent = ev
      session.showSelectEvent = true
      return ev
    },

    // 创建一个选项对象
    makeOption(id: string, content: string) {
      const op: SelectOption = reactive({ id, content })
      // 我们原神怎么你了？
      return op
    },

    // ------------------------ 交互类函数 ------------------------

    // 如果没有选中用户，则选中用户；否则，将当前用户设为null
    selectUser(user: User) {
      if (this.selectedUser != user) {
        this.selectedUser = user
        this.emitEvent(ContactEvent.OnUserSelected, user)
      } else {
        this.selectedUser = null
      }
    },

    // 如果没有选中会话，则选中会话
    selectSession(session: Session) {
      this.selectedSession = session
      this.emitEvent(ContactEvent.OnSessionSelected, session)
    },

    // ------------------------ 事件类函数 ------------------------

    // 给定回调，订阅一个事件
    addEventListener(
      event: ContactEvent,
      listener: Object,
      callback: Function
    ) {
      if (!this.eventListers[event]) {
        this.eventListers[event] = []
      }
      this.eventListers[event]?.push({ listener, callback })
    },

    // 发送一个事件
    emitEvent(event: ContactEvent, ...args: any[]) {
      if (!this.eventListers[event]) {
        return
      }
      for (const f of this.eventListers[event]!) {
        f.callback.call(f.listener, ...args)
      }
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
