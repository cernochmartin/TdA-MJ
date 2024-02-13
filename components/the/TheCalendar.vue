<script setup lang="ts">
import dayjs from 'dayjs'

const selectedDateValue = ref<number | null>(dayjs().date())

const selectedValues = reactive({
    month: dayjs().month(),
    year: dayjs().year()
})

function changeMonth(v: number) {
    selectedDateValue.value = null
    selectedValues.month = v
}

function changeYear(v: number) {
    selectedDateValue.value = null
    selectedValues.year = v
}

function changeDate(v: number) {
    selectedDateValue.value = v
}
</script>
<template>
    <div class="p-3 grid place-items-center">
        <Year @selected="changeYear" />
        <Month @selected="changeMonth" />
        <Days :selectedValues="selectedValues" :selectedDate="selectedDateValue" @selected="changeDate" />
        <div class="w-1/4 font-semibold">
            <span v-if="selectedDateValue">
                You have selected <br />
                {{ `${selectedDateValue} - ${selectedValues.month + 1} - ${selectedValues.year}` }}
            </span>
        </div>
    </div>
</template>