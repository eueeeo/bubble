import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import DataView from './views/DataView.vue';
import AuthView from './views/AuthView.vue';
import LogView from './views/LogView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/order',
        redirect: '/#order'
    },
    {
        path: '/orders',
        name: 'orders',
        component: DataView
    },
    {
        path: '/data',
        redirect: '/orders'
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthView
    },
    {
        path: '/logs',
        name: 'logs',
        component: LogView
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
