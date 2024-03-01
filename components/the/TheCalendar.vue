<script setup lang="ts">
import dayjs from 'dayjs'
const client = useSupabaseClient()

const selectedDateValue = ref<number | null>(dayjs().date())

const monthEmit = defineEmits<{ (e: 'selected', v: string): void }>()

const hours = [
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
    '20:00'
]

const meetingHours = reactive<{
    start: string
    end: string
}>({
    start: '',
    end: ''
})

const studentInfo = <{
    first_name: string
    last_name: string
    email: string
    phone: string
    place: string
    info: string
}>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    place: '',
    info: ''
})

const selectedHour = computed(() => {
    return `${meetingHours.start} - ${meetingHours.end}`
})

if (meetingHours.start === '' && meetingHours.end === '') {
    meetingHours.start = '8:00'
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
    if (meetingHours.start === '' || meetingHours.end === '' || studentInfo.first_name === '' || studentInfo.last_name === '' || studentInfo.email === '' || studentInfo.phone === '') {
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
                lecturer_uuid: props.uuid,
                first_name: studentInfo.first_name.replace(/\s/g, ''),
                last_name: studentInfo.last_name.replace(/\s/g, ''),
                email: studentInfo.email.replace(/\s/g, ''),
                phone: studentInfo.phone.replace(/\s/g, ''),
                place: studentInfo.place.replace(/\s/g, ''),
                info: studentInfo.info
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
        <Day :uuid="uuid" :same-as="data" :selectedValues="selectedValues" :selectedDate="selectedDateValue"
            @selected="changeDate" />
        <h3 class="text-center mt-6">Informace ke schůzi</h3>
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
            <p>Schůze se bude konat</p>
            <p class="font-semibold">{{ `${selectedDateValue} - ${selectedValues.month + 1} - ${selectedValues.year}` }}
                <span v-if="meetingHours.start && meetingHours.end">- {{ `${selectedHour}` }}</span>
            </p>
        </div>
        <h3 class="text-center my-6">Kontaktní a dodatečné informace studenta</h3>
        <div class="grid grid-cols-2 gap-3 w-[480px]">
            <div class="flex flex-col gap-1">
                <label>Jméno</label>
                <input v-model="studentInfo.first_name" type="text" placeholder="Jméno" class="border-b-2 border-sky" />
            </div>
            <div class="flex flex-col gap-1">
                <label>Příjmení</label>
                <input v-model="studentInfo.last_name" type="text" placeholder="Příjmení" class="border-b-2 border-sky" />
            </div>
            <div class="flex flex-col gap-1">
                <label>E-mail</label>
                <input v-model="studentInfo.email" type="email" placeholder="E-mail" class="border-b-2 border-sky" />
            </div>
            <div class="flex flex-col gap-1">
                <label>Telefon</label>
                <input v-model="studentInfo.phone" type="tel" placeholder="Telefon" class="border-b-2 border-sky" />
            </div>
            <div class="flex flex-col gap-1">
                <label>Místo</label>
                <input v-model="studentInfo.place" type="text" placeholder="Místo" class="border-b-2 border-sky" />
            </div>
        </div>
        <div class="flex flex-col gap-1 pt-3 w-[480px]">
            <label>Dodatečné informace pro lektora</label>
            <textarea v-model="studentInfo.info" placeholder="Dodatečné informace pro lektora" class="border-b-2 border-sky h-20" />
        </div>
        <div class="flex gap-6 mt-6">
            <button @click="scheduleMeeting()"
                class="text-center text-white animation-up bg-prussian w-[200px] py-2 rounded-md">Naplánovat
                schůzi</button>
            <NuxtLink :to="`/lecturer/${uuid}`"
                class="text-center text-white animation-up bg-error w-[200px] py-2 rounded-md">Zpět na profil lektora
            </NuxtLink>
        </div>
    </div>

    <!-- Popup -->
    <div v-show="popup.value" class="background-overlay h-full">
        <div class="flex items-center">
            <article
                class="bg-white text-center mx-auto min-h-[240px] min-w-[480px] max-w-[840px] rounded-xl flex flex-col gap-6 p-6 opacity-90">
                <template v-if="popup.type === 'error'">
                    <div class="text-2xl w-full flex justify-end">
                        <button @click="popup.value = !popup.value">&#10006;</button>
                    </div>
                    <div>
                        <h2 class="text-error">Vyplňte čas schůze, jméno, příjmení, e-mail a telefon.</h2>
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