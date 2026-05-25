import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "./assets/styles.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 2. 引入 dayjs 的中文语言包 (日期内部逻辑)
import "dayjs/locale/zh-cn";
const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
// 2. 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
