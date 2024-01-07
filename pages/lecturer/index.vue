<script setup lang="ts">
import type { Body } from '@/types/lecturer'

const { data } = await useFetch<any>('/lecturers')
const body = data.value.body as Body[]

useSeoMeta({
  title: 'Teacher digital Agency | Seznam lektorů',
  ogTitle: 'Teacher digital Agency | Seznam lektorů',
  description: 'Teacher digital Agency seznam lektorů.',
  ogDescription: 'Teacher digital Agency seznam lektorů.'
})
</script>
<template>
    <div class="container">
        <Lecturer v-for="lecturer in body" 
            :uuid="lecturer.lecturer_uuid"
            :title-before="lecturer.title_before"
            :first-name="lecturer.first_name"
            :middle-name="lecturer.middle_name"
            :last-name="lecturer.last_name"
            :title-after="lecturer.title_after"
            :picture-url="lecturer.picture_url"
            :claim="lecturer.claim"
            :bio="lecturer.bio"
        />
    </div>
</template>