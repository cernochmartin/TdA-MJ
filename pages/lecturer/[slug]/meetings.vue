<script setup lang="ts">
import dayjs from 'dayjs'
import type { Body } from '@/types/lecturer'
const client = useSupabaseClient()

const uuid = useRoute().path.split('/')[2]

const { data } = await useFetch<any>(`/lecturers/${uuid}`)
const body = data.value.body as Body[]

const { data: lecturer_data } = await client
    .from('calendar_db')
    .select()
    .eq('lecturer_uuid', uuid)

const selectedDateValue = ref<number | null>(dayjs().date())

const monthEmit = defineEmits<{ (e: 'selected', v: string): void }>()

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

const filteredMeeting = computed(() => {
    const meetings: any = []

    lecturer_data?.forEach((item: any) => {
        if (+item.year === selectedValues.year && +item.month === selectedValues.month && +item.day === selectedDateValue.value) {
            meetings.push(item)
        }
    })

    return meetings
})
</script>
<template>
    <main class="container pt-24">
        <h2 v-for="lecturer in body" class="text-center">{{ lecturer.title_before }} {{ lecturer.first_name }} {{
            lecturer.middle_name }} {{ lecturer.last_name }} {{ lecturer.title_after }}</h2>
        <p class="text-center pb-12">Přehled přijmutých, odmítnutých a nerozřazených schůzí lektora</p>
        <Year @selected="changeYear" />
        <Month @selected="changeMonth" />
        <Day :same-as="lecturer_data" :selectedValues="selectedValues" :selectedDate="selectedDateValue" @selected="changeDate" />
        <Meeting v-for="time in filteredMeeting" :lecturer-uuid="uuid" :year="time.year" :month="time.month" :day="time.day"
            :hour="time.hour" :uuid="time.calendar_uuid" :accepted="time.accepted" />
    </main>
</template>