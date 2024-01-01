<script setup lang="ts">
import type { Body } from '@/types/lecturer'

const uuid = useRoute().path.split('/').pop()

const { data } = await useFetch<any>(`/lecturers/${uuid}`)
const body = data.value.body as Body[]
console.log(body)
</script>
<template>
    <section v-for="lecturer in body" :key="lecturer.lecturer_uuid" class="container pt-32">
        <h1>{{ lecturer.title_before }} {{ lecturer.first_name }} {{ lecturer.middle_name }} {{ lecturer.last_name }} {{ lecturer.title_after }}</h1>
        <h2>{{ lecturer.claim }}</h2>
        <hr class="h-0.5 bg-prussian">
        <div class="flex justify-between pt-16">
            <div class="w-1/3">
                <img :src="lecturer.picture_url" alt="Fotografie lektora" class="h-[320px] w-[320px] rounded-xl"/>
            </div>
            <div class="w-2/3 flex flex-col gap-6">
                <p>
                    {{ lecturer.bio }}
                </p>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col gap-1">
                        <span class="text-prussian/70">Místo pobytu lektora:</span>
                        <span>{{ lecturer.location }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-prussian/70">Plat za hodinu:</span>
                        <span>{{ lecturer.price_per_hour }} Kč</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-prussian/70">E-mail:</span>
                        <div class="flex gap-2">
                            <NuxtLink v-for="email in lecturer.contact?.emails" :to="`mailto:${email}`">{{ email }}</NuxtLink>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-prussian/70">Telefon:</span>
                        <div class="flex gap-2">
                            <span v-for="phone in lecturer.contact?.telephone_numbers">{{ phone }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-[1fr,1fr,1fr,1fr] gap-2 pt-4">
            <!-- <Tag v-for="tag in props.tags" :text="tag.name" /> -->
        </div>
    </section>
</template>