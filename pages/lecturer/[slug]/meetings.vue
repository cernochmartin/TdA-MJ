<script setup lang="ts">
import type { Body } from '@/types/lecturer'
const supabase = useSupabaseClient()

const uuid = useRoute().path.split('/')[2]


const { data } = await useFetch<any>(`/lecturers/${uuid}`)
const body = data.value.body as Body[]

const { data: lecturer_data } = await supabase
    .from('calendar_db')
    .select()
    .eq('lecturer_uuid', uuid)
</script>
<template>
    <main class="container pt-24">
        <h2 v-for="lecturer in body" class="text-center">{{ lecturer.title_before }} {{ lecturer.first_name }} {{ lecturer.middle_name }} {{ lecturer.last_name }} {{ lecturer.title_after }}</h2>
        <p class="text-center">Přehled přijmutých, odmítnutých a nerozřazených schůzí lektora</p>
        <Meeting v-for="time in lecturer_data" :year="time.year" :month="time.month" :day="time.day" :hour="time.hour" :uuid="time.calendar_uuid" :accepted="time.accepted" />
    </main>
</template>