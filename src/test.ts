// test.ts
// 测试专用文件

import { XMLMessagePlayer } from "./modules/xml"

console.log("加载测试文件中~")

// 测试XML加载与播放
const xmlhttp = new XMLHttpRequest()
xmlhttp.open("GET", "/sample/tutorial.xml", false)
xmlhttp.send()
const xmlDoc = xmlhttp.responseXML

XMLMessagePlayer.loadXML(xmlDoc!)


export default null
