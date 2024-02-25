<script setup lang="ts">
import type { Body } from '@/types/lecturer'

useSeoMeta({
    title: 'Teacher digital Agency | Plánování schůzí s lektorem',
    ogTitle: 'Teacher digital Agency | Plánování schůzí s lektorem',
    description: 'Teacher digital Agency plánování schůzí s lektorem.',
    ogDescription: 'Teacher digital Agency plánování schůzí s lektorem.'
})

const uuid = useRoute().path.split('/')[2]

const { data } = await useFetch<any>(`/lecturers/${uuid}`)
const body = data.value.body as Body[]
</script>
<template>
    <div class="container full-page pt-24">
        <h2 v-for="lecturer in body" class="text-center">{{ lecturer.title_before }} {{ lecturer.first_name }} {{ lecturer.middle_name }} {{
            lecturer.last_name }} {{ lecturer.title_after }}</h2>
        <TheCalendar :uuid="uuid" />
    </div>
</template>