<script setup lang="ts">
import BodyContainer from '@/components/BodyContainer.vue'
import Navbar from '@/components/NavbarComponent.vue'
import HeadingH1 from '@/components/HeadingH1.vue'
import DarkButton from '@/components/buttons/DarkButton.vue'
import TableList from '@/components/tables/TableList.vue'
import TableBody from '@/components/tables/TableBody.vue'
import BadgeLink from '@/components/buttons/BadgeLink.vue'
</script>

<template>
    <Navbar />
    <BodyContainer>
        <HeadingH1 title="User List">
            <DarkButton>Add User</DarkButton>
        </HeadingH1>
        <TableList :headers="['#', 'Full Name', 'Email', 'Username', 'Max Login', 'Action']">
            <TableBody :values="['1', 'Kowo Kuwu', 'kowokuwu', 'kowo@mail.com', '1']">
                <BadgeLink title="edit" to="#" />
                <BadgeLink title="role management" to="#" />
            </TableBody>
        </TableList>
    </BodyContainer>
</template>

<style scoped></style>
