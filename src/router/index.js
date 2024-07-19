import {createMemoryHistory, createRouter, createWebHistory} from "vue-router";
import MoviesPage from "@/components/MoviesPage.vue";
import MoviePage from "@/components/MoviePage.vue";

const routes = [
    { path: '/', name: 'movies', component: MoviesPage },
    { path: '/movie/:id', name: 'movie', component: MoviePage },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router