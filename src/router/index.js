import {createMemoryHistory, createRouter} from "vue-router";
import MoviesPage from "@/components/MoviesPage.vue";

const routes = [
    { path: '/', name: 'movies', component: MoviesPage },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router