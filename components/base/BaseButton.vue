<script setup lang="ts">
const props = defineProps<{
    text: string
    link: string
}>()
</script>
<template>
    <NuxtLink :to="props.link" class="text-white bg-prussian block text-center shadow w-[172px] p-3 rounded-md animation-up">{{ props.text }}</NuxtLink>
</template>