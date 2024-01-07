<script setup lang="ts">
const props = defineProps<{
    text: string
    from: string
}>()
</script>
<template>
    <article class="p-4 rounded-xl border-sky border-2 h-[300px] flex flex-col justify-between">
        <div>
            <p>{{ props.text }}</p>
        </div>
        <div class="text-end">
            <span class="text-prussian/70">~ {{ props.from }}</span>
        </div>
    </article>
</template>