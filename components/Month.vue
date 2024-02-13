<script setup lang="ts">
import dayjs from 'dayjs'

const monthEmit = defineEmits<{ (e: 'selected', v: number): void }>()

const month = ref<number>(dayjs().month())

const cMonth = computed(() => dayjs().month(month.value).format('MMMM'))

function modifyMonth(v: number) {
    month.value += v
    monthEmit('selected', month.value)
}
</script>
<template>
    <div class="bg-prussian text-white p-3 grid place-items-center w-full">
        <span class="flex items-center space-x-3 select-none text-gray-50">
            <i @click="() => modifyMonth(-1)" class="fa-solid fa-chevron-left h-5 w-5 text-gray-400 cursor-pointer" />
            <span>{{ cMonth }}</span>
            <i @click="() => modifyMonth(1)" class="fa-solid fa-chevron-right h-5 w-5 text-gray-400 cursor-pointer" />
        </span>
    </div>
</template>