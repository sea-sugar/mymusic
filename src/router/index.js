import { createRouter,createWebHistory } from "vue-router";

const routes = [
    {path:'/',redirect:'/index'},
    {path:'',redirect:'/index'},
    {path: '/index', name: 'index', component: () => import('../views/index/Index.vue')},
    { path: '/rank', name: 'rank', component: () => import('../views/rank/Index.vue')},
    { path: '/music', name: 'music', component: () => import('../views/music/Index.vue')},
    { path: '/video', name: 'video', component: () => import('../views/video/Index.vue')},
    { path: '/dj', name: 'dj', component: () => import('../views/dj/Index.vue')},
    { path: '/playlist', name: 'playlist', component: () => import('../views/index/Playlist.vue')},
    { path: '/lastplay', name: 'lastplay', component: () => import('../views/lastplay/Index.vue')},
    // { path: '/nowplay', name: 'nowplay', component: () => import('../views/nowplay/Index.vue')},



];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;