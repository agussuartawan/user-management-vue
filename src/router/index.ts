import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '@/views/dashboard/ProfileView.vue'
import UserView from '@/views/dashboard/user/UserView.vue'
import RoleView from '@/views/dashboard/role/RoleView.vue'
import PermissionView from '@/views/dashboard/permission/PermissionView.vue'
// @ts-ignore
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect() {
                return { path: '/login' }
            }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/me',
            name: 'profile',
            component: ProfileView
        },
        {
            path: '/user',
            name: 'user',
            component: UserView
        },
        {
            path: '/role',
            name: 'role',
            component: RoleView
        },
        {
            path: '/permission',
            name: 'permission',
            component: PermissionView
        }
    ]
})

export default router
