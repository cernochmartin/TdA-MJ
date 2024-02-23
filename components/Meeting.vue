<script setup lang="ts">
const supabase = useSupabaseClient()

const props = defineProps<{
    year: string
    month: string
    day: string
    hour: string
    uuid: string
    accepted: boolean | null
}>()

async function acceptMeeting() {
    const { data, error } = await supabase
        .from('calendar_db')
        .update({ accepted: true })
        .eq('calendar_uuid', props.uuid)
    location.reload()
}

async function declineMeeting() {
    const { data, error } = await supabase
        .from('calendar_db')
        .update({ accepted: false })
        .eq('calendar_uuid', props.uuid)
    location.reload()
}

async function deleteMeeting() {
    const { data, error } = await supabase
        .from('calendar_db')
        .delete()
        .eq('calendar_uuid', props.uuid)
    location.reload()
}
</script>
<template>
    <article :class="{
        'border-success border-2': accepted,
        'border-error border-2': accepted === false,
        'border-sky border-2': accepted === null
    }" class="rounded-lg overflow-hidden shadow-2xl flex justify-between p-4 mt-24">
        <div class="">
            <h2>Schůze {{ props.uuid }}</h2>
            <p class="pt-2">Máte schůzi od {{ props.hour }} dne {{ props.day }}. {{ props.month }}. {{ props.year }}.</p>
        </div>
        <div v-if="accepted === null" class="flex flex-col justify-between w-[200px]">
            <div @click="acceptMeeting()" class="arrow-link cursor-pointer flex justify-between w-full">
                <span>Přijmout schůzi</span>
                <div><i class="fa-solid fa-check fa-2xl text-success" /></div>
            </div>
            <div @click="declineMeeting()" class="arrow-link cursor-pointer flex justify-between w-full">
                <span>Odmítnout schůzi</span>
                <div><i class="fa-solid fa-xmark fa-2xl text-error" /></div>
            </div>
        </div>
        <div v-else-if="accepted === false" class="flex flex-col justify-between w-[200px]">
            <div class="flex justify-between w-full">
                <span>Schůze odmítnuta</span><div><i class="fa-solid fa-xmark fa-2xl text-error" /></div>
            </div>
            <div class="flex justify-between w-full">
                <span @click="deleteMeeting()" class="arrow-link cursor-pointer">Smazat schůzi</span>
            </div>
        </div>
        <div v-else class="flex items-center justify-betweenw-[200px]">
            <span>Schůzka potvrzena</span><div><i class="fa-solid fa-check fa-2xl text-success" /></div>
        </div>
    </article>
</template>