import { createRouter,createWebHistory } from "vue-router";

const routes = [
    {path:'/',redirect:'/index'},
    {path:'',redirect:'/index'},
    {path:'/music',redirect:'/music/picked'},
    {path: '/index', name: 'index', component: () => import('../views/index/Index.vue')},
    { path: '/home', name: 'home', component: () => import('../views/home/Index.vue')},
    { path: '/music', name: 'music', component: () => import('../views/music/Index.vue'),
        children:[
        {path: 'picked', name: '/music/picked', component: () => import('../views/music/Picked/Picked.vue')},
        {path: 'toplist', name: '/music/toplist', component: () => import('../views/music/Toplist/Toplist.vue')},
        {path: 'artist', name: '/music/artist', component: () => import('../views/music/Artist/Artist.vue')},
        {path: 'category', name: '/music/category', component: () => import('../views/music/Category/Category.vue')},
    ]},
    { path: '/video', name: 'video', component: () => import('../views/vedio/Index.vue')},
    { path: '/dj', name: 'dj', component: () => import('../views/dj/Index.vue')},
    { path: '/playlist', name: 'playlist', component: () => import('../views/index/Playlist.vue')},
    { path: '/lastplay', name: 'lastplay', component: () => import('../views/lastplay/Index.vue')},
    { path: '/playMV', name: 'playMV', component: () => import('../views/index/playMV.vue')},
    { path: '/artistdetail', name: 'artistdetail', component: () => import('../views/music/Artist/Artistdetail.vue')},
    { path: '/playVedio', name: '/playVedio', component: () => import('../views/vedio/playVedio.vue')},



];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;