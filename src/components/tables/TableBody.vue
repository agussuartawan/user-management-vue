<script setup lang="ts">
defineProps<{
    values: String[]
}>()
</script>

<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td
            v-for="(v, index) in values"
            :key="index"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
            {{ v }}
        </td>
        <td class="px-6 py-4">
            <slot></slot>
        </td>
    </tr>
</template>

<style scoped></style>
