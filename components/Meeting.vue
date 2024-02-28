<script setup lang="ts">
import { createEvents, EventAttributes } from 'ics';

interface Meeting {
    year: string;
    month: string;
    day: string;
    hour: string;
}

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
}>()

const month = Number(props.month) + 1

async function changeMeetingValue(value: boolean) {
    const { data, error } = await client
        .from('calendar_db')
        .update({ accepted: value })
        .eq('calendar_uuid', props.uuid)
    location.reload()
}

async function deleteMeeting() {
    const { data, error } = await client
        .from('calendar_db')
        .delete()
        .eq('calendar_uuid', props.uuid)
    location.reload()
}

async function exportToIcs() {
    const { data, error } = await client
        .from('calendar_db')
        .select('*')
        .eq('calendar_uuid', props.uuid)

    if (error) {
        console.error('Error fetching meetings:', error);
        return;
    }

    const events: EventAttributes[] = data.map((meeting: Meeting) => ({
        start: [Number(meeting.year), Number(meeting.month), Number(meeting.day), Number(meeting.hour)],
        duration: { hours: 1 }, // Adjust this based on your meeting duration
        title: 'Meeting', // Adjust this based on your meeting title
        description: 'Meeting', // Adjust this based on your meeting description
        location: 'Location', // Adjust this based on your meeting location
    }));

    const { error: icsError, value } = createEvents(events);

    if (icsError) {
        console.error('Error creating .ics file:', icsError);
        return;
    }

    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'meetings.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const popup = ref<boolean>(false)
</script>
<template>
    <article :class="{
        'border-success border-2': accepted,
        'border-error border-2': accepted === false,
        'border-prussian border-2': accepted === null
    }" class="rounded-lg overflow-hidden shadow-2xl flex justify-between p-4 my-24">
        <div>
            <h2>Schůze {{ props.uuid }}</h2>
            <p class="pt-2">Máte schůzi od {{ props.hour }} dne {{ props.day }}. {{ month }}. {{ props.year }}.</p>
            <p>Ozvěte se studentovi {{ props.firstName }} {{ props.lastName }} na e-mail: <NuxtLink :to="props.email"
                    target="_blank"> {{ props.email }}</NuxtLink> nebo {{ props.phone }}.</p>
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
    {{ props.uuid }}
    <button @click="exportToIcs()" class="text-prussian">export to ics</button>

    <!-- Popup -->
    <div v-show="popup" class="background-overlay h-full">
        <div class="flex items-center">
            <article
                class="bg-white text-center mx-auto min-h-[240px] min-w-[480px] max-w-[840px] rounded-xl flex flex-col gap-6 p-6 opacity-90">
                <div class="text-2xl w-full flex justify-end">
                    <button @click="navigateTo(`/lecturer/${uuid}`)">&#10006;</button>
                </div>
                <div>
                    <h2 class="text-error">Vážně chcete smazat schůzi?</h2>
                    <button @click="deleteMeeting()" class="arrow-link">Ano, chci ji smazat.</button>
                </div>
            </article>
        </div>
    </div>
</template>