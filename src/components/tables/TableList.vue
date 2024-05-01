<script setup lang="ts">
defineProps<{
    headers: string[]
}>()
</script>

<template>
    <div class="relative overflow-x-auto rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th
                        scope="col"
                        class="px-6 py-3"
                        v-for="(header, index) in headers"
                        :key="index"
                    >
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>
