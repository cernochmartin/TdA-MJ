<script setup lang="ts">
import dayjs from 'dayjs'
import { client } from '~/utils/supabase'

const selectedDateValue = ref<number | null>(dayjs().date())

const monthEmit = defineEmits<{ (e: 'selected', v: string): void }>()

const hours = [
    '1:00',
    '2:00',
    '3:00',
    '4:00',
    '5:00',
    '6:00',
    '7:00',
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '0:00'
]

const meetingHours = reactive<{
    start: string
    end: string
}>({
    start: '',
    end: ''
})

const selectedHour = computed(() => {
    return `${meetingHours.start} - ${meetingHours.end}`
})

if (meetingHours.start === '' && meetingHours.end === '') {
    meetingHours.start = `${dayjs().hour()}:00`
}

const meetingEndHours = computed(() => {
    const viableHours: string[] = []

    hours.forEach((item: string) => {
        item.split(':').forEach((item: string) => {
            const sameHour = Number(meetingHours.start.split(':')[0])

            if (Number(item) > sameHour) {
                viableHours.splice(0, 0, `${item}:00`)
            }
        })
    })
    return viableHours.reverse()
})

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

const popup = ref<{
    value: boolean
    type: string
}>({
    value: false,
    type: ''
})

async function scheduleMeeting() {
    if (meetingHours.start === '' || meetingHours.end === '') {
        popup.value = {
            value: true,
            type: 'error'
        }
        return
    }
    else {
        const { data, error } = await client
            .from('calendar_db')
            .insert([{
                year: selectedValues.year,
                month: selectedValues.month,
                day: selectedDateValue.value,
                hour: selectedHour.value,
                lecturer_uuid: props.uuid
            }])
        popup.value = {
            value: true,
            type: 'success'
        }
    }
}

const { data } = await client
    .from('calendar_db')
    .select()
    .eq('lecturer_uuid', props.uuid)
</script>
<template>
    <div class="p-3 grid place-items-center">
        <Year @selected="changeYear" />
        <Month @selected="changeMonth" />
        <Day :same-as="data" :selectedValues="selectedValues" :selectedDate="selectedDateValue" @selected="changeDate" />
        <section class="flex flex-col gap-2 w-[200px] my-6">
            <div class="flex justify-between">
                <label>Začátek schůze</label>
                <select v-model="meetingHours.start">
                    <option v-for="hour in hours">{{ hour }}</option>
                </select>
            </div>
            <div class="flex justify-between">
                <label>Konec schůze</label>
                <select v-if="meetingHours.start" v-model="meetingHours.end">
                    <option v-for="hour in meetingEndHours">{{ hour }}</option>
                </select>
            </div>
        </section>
        <div v-if="selectedDateValue" class="flex flex-col gap-1 items-center">
            <p>Schůzka se bude konat</p>
            <p class="font-semibold">{{ `${selectedDateValue} - ${selectedValues.month + 1} - ${selectedValues.year}` }}
                <span v-if="meetingHours.start && meetingHours.end">- {{ `${selectedHour}` }}</span>
            </p>
        </div>
        <div class="flex gap-6 mt-6">
            <button @click="scheduleMeeting()"
                class="text-center text-white animation-up bg-prussian w-[200px] py-2 rounded-md">Naplánovat
                schůzku</button>
            <NuxtLink :to="`/lecturer/${uuid}`"
                class="text-center text-white animation-up bg-error w-[200px] py-2 rounded-md">Zpět na profil lektora
            </NuxtLink>
        </div>
    </div>
    <div v-show="popup.value" class="background-overlay h-full">
        <div class="flex items-center">
            <article
                class="bg-white text-center mx-auto min-h-[240px] min-w-[480px] max-w-[840px] rounded-xl flex flex-col gap-6 p-6 opacity-90">
                <template v-if="popup.type === 'error'">
                    <div class="text-2xl w-full flex justify-end">
                        <button @click="popup.value = !popup.value">&#10006;</button>
                    </div>
                    <div>
                        <h2 class="text-error">Vyplňte čas schůze.</h2>
                    </div>
                </template>
                <template v-if="popup.type === 'success'">
                    <div class="text-2xl w-full flex justify-end">
                        <button @click="navigateTo(`/lecturer/${uuid}`)">&#10006;</button>
                    </div>
                    <div>
                        <h2 class="text-success">Schůze čeká na schválení od lektora.</h2>
                    </div>
                </template>
            </article>
        </div>
    </div>
</template>