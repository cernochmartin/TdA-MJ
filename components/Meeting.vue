<script setup lang="ts">
import { createEvent } from 'ics'

const client = useSupabaseClient()

const props = defineProps<{
    year: string
    month: string
    day: string
    hour: string
    uuid: string
    accepted: boolean | null
    firstName: string
    lastName: string
    email: string
    phone: string
    place: string
    tag: string
    info: string
}>()

const month = Number(props.month) + 1

async function changeMeetingValue(value: boolean) {
    await client
        .from('calendar_db')
        .update({ accepted: value })
        .eq('calendar_uuid', props.uuid)
    location.reload()
}

async function deleteMeeting() {
    await client
        .from('calendar_db')
        .delete()
        .eq('calendar_uuid', props.uuid)
    location.reload()
}

const splitHours = props.hour.split('-')
const startHour = splitHours[0].split(':')[0]
const endHour = splitHours[1].split(':')[0]
const duration = (Number(endHour) - Number(startHour)) * 60

function exportToIcs() {
    createEvent({
        title: 'Výuka ' + props.firstName + ' ' + props.lastName,
        description: 'Schůze se studentem ' + props.firstName + ' ' + props.lastName,
        busyStatus: 'FREE',
        start: [Number(props.year), month, Number(props.day), Number(startHour), 0],
        duration: { minutes: duration }
    }, (error, value) => {
        if (error) {
            console.log(error)
            return
        }

        const blob = new Blob([value], { type: 'text/calendar;charset=utf-8;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', props.year + '-' + month + '-' + props.day + '_plan-vyuky.ics')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })
}

const popup = ref<boolean>(false)
</script>
<template>
    <article :class="{
        'border-success border-2': accepted,
        'border-error border-2': accepted === false,
        'border-prussian border-2': accepted === null
    }" class="rounded-lg overflow-hidden shadow-2xl flex justify-between p-4 mt-24">
        <div>
            <h2>Schůze {{ props.uuid }}</h2>
            <p class="pt-2">Máte schůzi od {{ props.hour }} dne {{ props.day }}. {{ month }}. {{ props.year }}.</p>
            <p>Ozvěte se studentovi {{ props.firstName }} {{ props.lastName }} na e-mail: <NuxtLink :to="props.email"
                    target="_blank"> {{ props.email }}</NuxtLink> nebo na číslo {{ props.phone }}.</p>
            <p>{{ props.info }}</p>
            <span>Lokalita: {{ props.place }}</span> <span>Tag: {{ props.tag }}</span>
        </div>
        <div v-if="accepted === null" class="flex flex-col justify-between w-[200px]">
            <div @click="changeMeetingValue(true)" class="arrow-link cursor-pointer flex justify-between w-full">
                <span>Přijmout schůzi</span>
                <div><i class="fa-solid fa-check fa-2xl text-success" /></div>
            </div>
            <div @click="changeMeetingValue(false)" class="arrow-link cursor-pointer flex justify-between w-full">
                <span>Odmítnout schůzi</span>
                <div><i class="fa-solid fa-xmark fa-2xl text-error" /></div>
            </div>
        </div>
        <div v-else-if="accepted === false" class="flex flex-col justify-between w-[200px]">
            <div @click="changeMeetingValue(true)" class="arrow-link cursor-pointer flex justify-between w-full">
                <span>Přijmout schůzi</span>
                <div><i class="fa-solid fa-check fa-2xl text-success" /></div>
            </div>
            <div @click="popup = !popup" class="arrow-link cursor-pointer flex justify-between w-full">
                <span>Smazat schůzi</span>
                <div><i class="fa-regular fa-trash-can fa-2xl text-error" /></div>
            </div>
        </div>
        <div v-else class="flex items-center w-[200px]">
            <div @click="changeMeetingValue(false)" class="arrow-link cursor-pointer flex justify-between w-full">
                <span>Odmítnout schůzi</span>
                <div><i class="fa-solid fa-xmark fa-2xl text-error" /></div>
            </div>
        </div>
    </article>
    <button @click="exportToIcs()"
        class="animation-up bg-prussian text-white text-center w-full py-2 rounded-md mt-6">Export schůze do formátu
        iCalendar</button>

    <!-- Popup -->
    <div v-show="popup" class="background-overlay h-full">
        <div class="flex items-center">
            <article
                class="bg-white text-center mx-auto min-h-[240px] min-w-[480px] max-w-[840px] rounded-xl flex flex-col gap-6 p-6 opacity-90">
                <div class="text-2xl w-full flex justify-end">
                    <button @click="popup = !popup">&#10006;</button>
                </div>
                <div>
                    <h2 class="text-error">Vážně chcete smazat schůzi?</h2>
                    <button @click="deleteMeeting()" class="arrow-link">Ano, chci ji smazat.</button>
                </div>
            </article>
        </div>
    </div>
</template>