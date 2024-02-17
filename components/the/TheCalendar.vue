<script setup lang="ts">
import type { Calendar } from '@/types/lecturer'
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

async function scheduleMeeting() {
    const { data, error } = await supabase
        .from('calendar_db')
        .insert([{
            year: selectedValues.year,
            month: selectedValues.month,
            day: selectedDateValue.value,
            hour: 2,
            lecturer_uuid: props.uuid
        }])
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
        <Hour />
        <div v-if="selectedDateValue" class="flex flex-col gap-1 items-center mt-6">
            <p>Schůzka se bude konat</p>
            <p class="font-semibold">{{ `${selectedDateValue} - ${selectedValues.month + 1} - ${selectedValues.year}` }}</p>
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