<script setup lang="ts">
import dayjs from 'dayjs'
import type { Body } from '@/types/lecturer'

useSeoMeta({
    title: 'Teacher digital Agency | Plánované schůze',
    ogTitle: 'Teacher digital Agency | Plánované schůze',
    description: 'Přehled přijmutých, odmítnutých a nerozřazených schůzí lektora.',
    ogDescription: 'Přehled přijmutých, odmítnutých a nerozřazených schůzí lektora.'
})

const client = useSupabaseClient()

const userId = ref()
await client.auth.getSession().then((session) => {
    userId.value = session.data.session?.user.id
})

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

const count = computed(() => {
    return filteredMeeting.value.length
})
</script>
<template>
    <template v-if="userId === uuid">
        <main class="container pt-24">
            <h2 v-for="lecturer in body" class="text-center">{{ lecturer.title_before }} {{ lecturer.first_name }} {{
                lecturer.middle_name }} {{ lecturer.last_name }} {{ lecturer.title_after }}</h2>
            <p class="text-center pb-12">Přehled přijmutých, odmítnutých a nerozřazených schůzí lektora</p>
            <Year @selected="changeYear" />
            <Month @selected="changeMonth" />
            <Day :same-as="lecturer_data" :selectedValues="selectedValues" :selectedDate="selectedDateValue"
                @selected="changeDate" />
            <div class="text-center mt-6">
                <span>
                    Zobrazujete si den <span v-if="selectedDateValue">{{ selectedDateValue }}</span><span v-else>x</span>. {{ selectedValues.month + 1 }}. {{ selectedValues.year }},
                    ve kterém máte {{ count }}
                    <span v-if="count === 1">schůzi</span>
                    <span v-else-if="count > 1 && count < 5">schůze</span>
                    <span v-else="count === 0">schůzí</span>.
                </span>
            </div>
            <Meeting v-for="time in filteredMeeting" :lecturer-uuid="uuid" :year="time.year" :month="time.month"
                :day="time.day" :hour="time.hour" :uuid="time.calendar_uuid" :accepted="time.accepted"
                :first-name="time.first_name" :last-name="time.last_name" :email="time.email" :phone="time.phone"
                :place="time.place" :tag="time.tag" :info="time.info" />
        </main>
    </template>

    <template v-else>
        <main class="container pt-24">
            <h2 class="text-center text-error">Nemáte oprávnění zobrazit si schůze lektora</h2>
            <h2 v-for="lecturer in body" class="text-center text-error">{{ lecturer.title_before }} {{ lecturer.first_name
            }} {{
    lecturer.middle_name }} {{ lecturer.last_name }} {{ lecturer.title_after }}</h2>
        </main>
    </template>
</template>