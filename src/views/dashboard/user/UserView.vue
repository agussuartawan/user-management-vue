<script>
import BodyContainer from '@/components/BodyContainer.vue'
import Navbar from '@/components/NavbarComponent.vue'
import HeadingH1 from '@/components/HeadingH1.vue'
import DarkButton from '@/components/buttons/DarkButton.vue'
import TableList from '@/components/tables/TableList.vue'
import TableTr from '@/components/tables/TableTr.vue'
import BadgeLink from '@/components/buttons/BadgeLink.vue'
import axiosInstance from '@/utils/axiosInstance.ts'
import TableTd from '@/components/tables/TableTd.vue'
import { join } from '@/utils/stringUtil.ts'

export default {
    components: {
        TableTd,
        TableTr,
        BadgeLink,
        TableList,
        DarkButton,
        HeadingH1,
        BodyContainer,
        Navbar
    },
    mounted() {
        this.fetchUser()
    },
    data() {
        return {
            users: []
        }
    },
    methods: {
        join,
        fetchUser() {
            axiosInstance
                .get('/api/v1/master/user')
                .then((res) => {
                    console.log(res.data)
                    this.users = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}
</script>

<template>
    <Navbar />
    <BodyContainer>
        <HeadingH1 title="User List">
            <DarkButton title="Add User" />
        </HeadingH1>
        <TableList :headers="['#', 'Full Name', 'Username', 'Max Login', 'Roles', 'Action']">
            <TableTr v-for="(user, index) in users" :key="index" value="">
                <TableTd>{{ index + 1 }}</TableTd>
                <TableTd>{{ user.fullName }}</TableTd>
                <TableTd>{{ user.username }}</TableTd>
                <TableTd>{{ user.maxLoginAttempt }}</TableTd>
                <TableTd>{{ join(user.roles) }}</TableTd>
                <TableTd>
                    <BadgeLink title="edit" to="#" />
                    <BadgeLink title="role management" to="#" />
                </TableTd>
            </TableTr>
        </TableList>
    </BodyContainer>
</template>

<style scoped></style>
