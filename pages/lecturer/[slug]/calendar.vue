<script setup lang="ts">
import type { Body } from '@/types/lecturer'
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