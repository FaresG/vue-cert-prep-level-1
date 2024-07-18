import { createApp } from 'vue'
import {createMemoryHistory, createRouter} from "vue-router";
import App from './App.vue'
import './index.css'

const routes = [
    { path: '/', name: 'app', component: App },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

createApp(App).use(router).mount('#app')
