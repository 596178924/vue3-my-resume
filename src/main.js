import { createApp } from 'vue-demi'
import AppElement from './App.vue'
import pluginInstall from "./plugins";

(() => {
    const app = createApp(AppElement);
    app.use(pluginInstall);
    app.mount('#app');
    return app;
})()
