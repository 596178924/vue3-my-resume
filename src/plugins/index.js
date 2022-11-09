import VueRouter from "@/router"
import piniaInstall from "./pinia";
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import { setupInstallGlobalComponents } from "@/globalComponents"


export default function install(app) {
  app.use(VueRouter)
  app.use(piniaInstall);
  app.use(ElementPlus);
  setupInstallGlobalComponents(app)
}
