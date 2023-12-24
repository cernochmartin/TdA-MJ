<script setup lang="ts">
const props = defineProps<{
    text: string
}>()
</script>
<template>
    <span class="bg-sky px-1 py-2 flex text-center justify-center items-center shadow-xl rounded-md">{{ props.text }}</span>
</template>