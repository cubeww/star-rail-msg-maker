// xml.ts
// XML格式消息解析 / 播放模块

import {
  useContactStore,
  ContactEvent,
  type Session,
  type Message,
  type SelectOption,
} from "@/stores/contact"
import { nanoid } from "nanoid"
const contact = useContactStore()

export const XMLMessagePlayer = {
  currentXML: null! as XMLDocument,
  currentSessionNode: null! as ChildNode,
  // 订阅事件
  use() {
    contact.addEventListener(
      ContactEvent.OnSessionSelected,
      this,
      this.onSessionSelected
    )
    contact.addEventListener(
      ContactEvent.OnMessageSent,
      this,
      this.onMessageSent
    )
    contact.addEventListener(
      ContactEvent.OnOptionSelected,
      this,
      this.onOptionSelected
    )
  },
  loadXML(xml: XMLDocument) {
    // 为所有标签生成id
    this.generateId(xml.documentElement)

    // 存入User和Session
    for (const user of xml.getElementsByTagName("user")) {
      const newUser = contact.addUser(
        user.getAttribute("id")!,
        user.getAttribute("name")!,
        user.getAttribute("avatar")!,
        user.getAttribute("desc")!
      )

      for (const session of user.getElementsByTagName("session")) {
        contact.addSession(newUser, session.getAttribute("id")!)
      }
    }

    this.currentXML = xml
  },
  playSession(session: Session) {
    this.currentSessionNode = this.currentXML.getElementById(session.id)!
  },
  generateId(node: ChildNode) {
    // 检查节点类型为元素节点
    if (node.nodeType === 1) {
      // 设置id
      ;(node as Element).setAttribute("id", nanoid())

      // 遍历子节点
      for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i]
        this.generateId(childNode)
      }
    }
  },
  onSessionSelected(session: Session) {
    
    this.playSession(session)
  },
  onMessageSent(msg: Message) {},
  onOptionSelected(option: SelectOption) {},
}
