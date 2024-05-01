<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold text-gray-100 mb-3">{{ title }}</h1>
        <slot></slot>
    </div>
</template>
