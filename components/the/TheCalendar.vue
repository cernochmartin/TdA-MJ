<script setup lang="ts">
import dayjs from 'dayjs'
const supabase = useSupabaseClient()

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

const props = defineProps<{
    uuid: string
}>()

async function createMeeting() {
    const { data, error } = await supabase
        .from('calendar_db')
        .insert({
            year: selectedValues.year,
            month: selectedValues.month + 1,
            day: selectedDateValue.value,
            hour: 2,
            lecturer_uuid: props.uuid
        })
}
</script>
<template>
    <div class="p-3 grid place-items-center">
        <Year @selected="changeYear" />
        <Month @selected="changeMonth" />
        <Day :selectedValues="selectedValues" :selectedDate="selectedDateValue" @selected="changeDate" />
        <Hour />
        <div class="w-1/4 font-semibold">
            <span v-if="selectedDateValue">
                You have selected <br />
                {{ `${selectedDateValue} - ${selectedValues.month + 1} - ${selectedValues.year}` }}
            </span>
        </div>
        <button @click="createMeeting()">Create meeting</button>
    </div>
</template>