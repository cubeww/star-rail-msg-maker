// main.ts
// 程序入口

import { createApp } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount("#app")

// 安装模块：XML
import("./modules/xml").then((xml) => {
  xml.XMLMessagePlayer.use()
}).then(()=>{
  import('./test')
})

