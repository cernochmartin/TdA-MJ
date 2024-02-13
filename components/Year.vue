<script setup lang="ts">
import dayjs from 'dayjs'

const yearEmit = defineEmits<{ (e: 'selected', v: number): void }>()

const year = ref<number>(dayjs().year())

function modifyYear(v: number) {
    year.value += v
    yearEmit('selected', year.value)
}
</script>
<template>
    <div class="w-full p-3 border-2 border-prussian rounded-t-md grid place-items-center">
        <span class="flex items-center space-x-3 select-none text-gray-50">
            <i @click="() => modifyYear(-1)" class="fa-solid fa-chevron-left h-5 w-5 text-gray-400 cursor-pointer" />
            <span>{{ year }}</span>
            <i @click="() => modifyYear(1)" class="fa-solid fa-chevron-right h-5 w-5 text-gray-400 cursor-pointer" />
        </span>
    </div>
</template>