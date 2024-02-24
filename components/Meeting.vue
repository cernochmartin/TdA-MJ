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

const month = Number(props.month) + 1

async function changeMeetingValue(value: boolean) {
    const { data, error } = await supabase
        .from('calendar_db')
        .update({ accepted: value })
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
        'border-prussian border-2': accepted === null
    }" class="rounded-lg overflow-hidden shadow-2xl flex justify-between p-4 mt-24">
        <div class="">
            <h2>Schůze {{ props.uuid }}</h2>
            <p class="pt-2">Máte schůzi od {{ props.hour }} dne {{ props.day }}. {{ month }}. {{ props.year }}.</p>
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
            <div @click="deleteMeeting()" class="arrow-link cursor-pointer flex justify-between w-full">
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
</template>