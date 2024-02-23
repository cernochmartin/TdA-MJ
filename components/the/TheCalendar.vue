<script setup lang="ts">
import dayjs from 'dayjs'
const supabase = useSupabaseClient()

const selectedDateValue = ref<number | null>(dayjs().date())
const selectedHour = ref<string | null>(null)

const monthEmit = defineEmits<{ (e: 'selected', v: string): void }>()

const hours = [
    '1:00 - 2:00',
    '2:00 - 3:00',
    '3:00 - 4:00',
    '4:00 - 5:00',
    '5:00 - 6:00',
    '6:00 - 7:00',
    '7:00 - 8:00',
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
    '21:00 - 22:00',
    '22:00 - 23:00',
    '23:00 - 24:00'
]

function selectHour(hour: string) {
    selectedHour.value = hour
}

if (selectedHour.value === null) {
    selectedHour.value = `${dayjs().hour()}:00 - ${dayjs().hour() + 1}:00`
}

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

async function scheduleMeeting() {
    const { data, error } = await supabase
        .from('calendar_db')
        .insert([{
            year: selectedValues.year,
            month: selectedValues.month,
            day: selectedDateValue.value,
            hour: selectedHour.value,
            lecturer_uuid: props.uuid
        }])
    navigateTo(`/lecturer/${props.uuid}`)
}

const { data } = await supabase
    .from('calendar_db')
    .select()
    .eq('lecturer_uuid', props.uuid)
</script>
<template>
    <div class="p-3 grid place-items-center">
        <Year @selected="changeYear" />
        <Month @selected="changeMonth" />
        <Day :same-as="data" :selectedValues="selectedValues" :selectedDate="selectedDateValue" @selected="changeDate" />
        <div v-for="hour in hours">
            <span @click="selectHour(hour)" class="cursor-pointer">{{ hour }}</span>
        </div>
        <div v-if="selectedDateValue" class="flex flex-col gap-1 items-center mt-6">
            <p>Schůzka se bude konat</p>
            <p class="font-semibold">{{ `${selectedDateValue} - ${selectedValues.month + 1} - ${selectedValues.year} -
                            ${selectedHour}` }}</p>
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
</template>