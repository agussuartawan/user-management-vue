<script>
import axios from 'axios'
import { useCookies } from '@vueuse/integrations/useCookies'
import DangerAlert from '@/components/alerts/DangerAlert.vue'

export default {
    components: { DangerAlert },
    setup() {
        const cookies = useCookies()
        return {
            cookies
        }
    },
    data() {
        return {
            form: {
                username: null,
                password: null,
                ipAddress: window.location.host
            },
            error: false,
            errorMessage: ''
        }
    },
    methods: {
        login() {
            axios
                .post('http://localhost:8179/api/v1/auth/username-login', this.form)
                .then((res) => {
                    const data = res.data
                    this.cookies.set('session', {
                        refreshToken: data.refreshToken,
                        accessToken: data.accessToken,
                        fullName: data.fullName,
                        roles: data.roles.join(','),
                        permissions: data.permissions.join(','),
                        userId: data.userId
                    })
                    this.$router.push('/me')
                })
                .catch((err) => {
                    console.log(err)
                    if (err.response.data) {
                        this.error = true
                        this.errorMessage = err.response.data.message
                    }
                })
        }
    }
}
</script>

<template>
    <DangerAlert v-if="error" class="max-w-md mx-auto" title="Error" :message="errorMessage" />
    <form
        class="max-w-md mx-auto border border-gray-500 bg-gray-950 rounded-lg shadow p-6"
        @submit.prevent="login"
    >
        <h1 class="text-5xl mb-5 text-center font-bold uppercase text-white">Coll's</h1>
        <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
            >
            <input
                v-model="form.username"
                type="text"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
            />
        </div>
        <div class="mb-5">
            <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
            >
            <input
                v-model="form.password"
                type="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
        </div>
        <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Login
        </button>
    </form>
</template>
