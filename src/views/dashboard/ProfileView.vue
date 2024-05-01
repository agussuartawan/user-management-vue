<script>
import Navbar from '@/components/NavbarComponent.vue'
import BodyContainer from '@/components/BodyContainer.vue'
import axiosInstance from '@/utils/axiosInstance.ts'
import DarkButton from '@/components/buttons/DarkButton.vue'
import { format } from '@/utils/dateUtil.ts'
import { join } from '@/utils/stringUtil.ts'
import SimpleSpinner from '@/components/spinners/SimpleSpinner.vue'
import HeadingH1 from '@/components/HeadingH1.vue'
import DangerAlert from '@/components/alerts/DangerAlert.vue'
import userSession, { setFullName } from '@/utils/Session.ts'

export default {
    components: { DangerAlert, HeadingH1, SimpleSpinner, DarkButton, Navbar, BodyContainer },
    mounted() {
        this.fetch()
        this.session = userSession
    },
    data() {
        return {
            user: {},
            error: false,
            loading: true,
            showForm: false,
            errorMessage: '',
            session: {},
            form: {
                fullName: null,
                email: null,
                username: null
            }
        }
    },
    methods: {
        join,
        format,
        fetch() {
            this.loading = true
            this.error = false
            axiosInstance
                .get('/api/v1/master/user/me')
                .then((res) => {
                    this.user = res.data
                    this.form = res.data
                })
                .catch((err) => {
                    console.error(err)
                    this.error = true
                })
                .finally(() => (this.loading = false))
        },
        tryAgain() {
            this.fetch()
        },
        updateProfile() {
            axiosInstance
                .put(`/api/v1/master/user/${this.session.userId}`, this.form)
                .then((res) => {
                    console.log(res)
                    this.showForm = false
                    setFullName(this.form.fullName)
                })
                .catch((err) => {
                    console.log(err)
                    if (err.response.data) {
                        this.errorMessage = err.response.data.message
                    }
                })
        }
    }
}
</script>

<template>
    <Navbar />
    <BodyContainer>
        <HeadingH1 title="Profile" />
        <SimpleSpinner v-if="loading" />
        <DarkButton @click="tryAgain" v-if="error" title="Try Again" />
        <DangerAlert v-if="errorMessage !== ''" title="Error" :message="errorMessage" />
        <div class="grid grid-cols-2 gap-5">
            <div
                v-if="!error && !loading"
                class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
                <img
                    class="rounded-t-lg w-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MSZkkdUtP0jf5CktNxPs1b73iiw1h0DjTA&usqp=CAU"
                    alt="profile-picture"
                />
                <div class="p-5">
                    <h5
                        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                        Hallo namaku {{ user.fullName }}
                    </h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Aku memiliki role sebagai <b>{{ join(user.roles) }}</b
                        >. Aku telah bergabung pada <b>{{ format(user.createdAt) }}</b
                        >. Profil ku terakhir di update pada <b>{{ format(user.updatedAt) }}</b
                        >. Kamu dapat menghubungiku pada email berikut
                        <b> {{ user.email }}</b>
                    </p>
                    <a
                        @click.prevent="showForm = true"
                        href="#"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update Profile
                        <svg
                            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>
            </div>

            <form class="w-full mx-auto" v-if="showForm" @submit.prevent="updateProfile">
                <div class="mb-5">
                    <label
                        for="fullName"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Full Name</label
                    >
                    <input
                        v-model="form.fullName"
                        type="text"
                        id="fullName"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>
                <div class="mb-5">
                    <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Email</label
                    >
                    <input
                        v-model="form.email"
                        type="email"
                        id="email"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>
                <div class="mb-5">
                    <label
                        for="username"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Username</label
                    >
                    <input
                        v-model="form.username"
                        type="text"
                        id="username"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>
                <button
                    type="submit"
                    class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Save
                </button>
                <button
                    @click.prevent="showForm = false"
                    type="button"
                    class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                    Cancel
                </button>
            </form>
        </div>
    </BodyContainer>
</template>

<style scoped></style>
