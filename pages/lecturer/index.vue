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

const selectedTags = ref([])

const filteredLecturers = computed(() => {
    if (selectedTags.value.length === 0)
        return body

    const myResult: string[] = []
    body.forEach((item: any) => {
        const includedTags: string[] = []
        item.tags?.forEach(tag => includedTags.push(tag.name))
        if (includedTags.length === 0)
            return

        const equalTags = selectedTags.value.filter((tag: any) => includedTags.includes(tag))
        if (equalTags.length !== 0)
            myResult.push(item)
    })
    return myResult
})
</script>
<template>
    <div class="container full-page my-24">
        <div class="grid grid-cols-2">
            <div v-for="tag in tags">
                <span><input type="checkbox" :name="tag" :value="tag" v-model="selectedTags" class="cursor-pointer" /> {{ tag }}</span>
            </div>
        </div>
        <Lecturer v-for="lecturer in filteredLecturers" :uuid="lecturer.lecturer_uuid" :title-before="lecturer.title_before"
            :first-name="lecturer.first_name" :middle-name="lecturer.middle_name" :last-name="lecturer.last_name"
            :title-after="lecturer.title_after" :picture-url="lecturer.picture_url" :claim="lecturer.claim"
            :bio="lecturer.bio" />
    </div>
</template>