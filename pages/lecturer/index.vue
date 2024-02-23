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

let tags: any[] = []

body.forEach((item: any) => {
    if (item.tags) {
        item.tags.forEach((tag: any) => {
            tags.push(tag.name)
        })
    }
})

tags = [...new Set(tags)]

const checked = ref(false)
const resultFiltered = ref()
const resultLecturers = ref(tags)

function result(tag: string) {
    resultLecturers.value = tag === '' ? body : body.filter((item: any) => item.tag === tag)
}

// const filteredLecturers = computed(() => {
//     resultFiltered.value = !checked.value ? resultLecturers.value : resultLecturers.value.filter((item: any) => item.tags.includes('Tělocvik'))
// })

// console.log('222',filteredLecturers.value)
// console.log()
</script>
<template>
    <div v-for="tag in tags">
        <span @click="result(tag)">{{ tag }}</span>
    </div>
    <div class="container full-page mb-24">
        <Lecturer v-for="lecturer in body" :uuid="lecturer.lecturer_uuid" :title-before="lecturer.title_before"
            :first-name="lecturer.first_name" :middle-name="lecturer.middle_name" :last-name="lecturer.last_name"
            :title-after="lecturer.title_after" :picture-url="lecturer.picture_url" :claim="lecturer.claim"
            :bio="lecturer.bio" />
    </div>
</template>