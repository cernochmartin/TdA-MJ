<script setup lang="ts">
import type { Body } from '@/types/lecturer'

const uuid = useRoute().path.split('/').pop()

const { data } = await useFetch<any>(`/lecturers/${uuid}`)
const body = data.value.body as Body[]

useSeoMeta({
  title: 'Teacher digital Agency | Profil lektora',
  ogTitle: 'Teacher digital Agency | Profil lektora',
  description: 'Teacher digital Agency profil lektora ' + `${uuid}.`,
  ogDescription: 'Teacher digital Agency profil lektora ' + `${uuid}.`,
})

const popup = ref(false)

async function editLecturer() {

}

async function deleteLecturer() {
    const { data } = await useFetch(`/lecturers/${uuid}`, {
        method: 'DELETE'
    })
    popup.value = true
}
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
                        <span>{{ lecturer?.location }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-prussian/70">Plat za hodinu:</span>
                        <span>{{ lecturer?.price_per_hour }} Kč</span>
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
        <div class="flex justify-end">
            <div class="flex gap-6">
                <button @click="editLecturer()" class="animation-up bg-sunglow w-[100px] py-2 rounded-md">Edit</button>
                <button @click="deleteLecturer()" class="animation-up bg-error w-[100px] py-2 rounded-md text-white">Delete</button>
            </div>
        </div>
    </section>
    <div v-show="popup" class="background-overlay h-full">
        <div class="flex items-center">
            <article class="bg-white text-center mx-auto min-h-[240px] min-w-[480px] max-w-[800px] rounded-xl flex flex-col gap-6 p-6 opacity-90">
                <div class="text-2xl w-full flex justify-end">
                    <NuxtLink to="/lecturer">&#10006;</NuxtLink>
                </div>
                <h2 class="text-success">Lektor {{ uuid }} byl vymazán.</h2>
                <NuxtLink to="/lecturer" class="text-prussian/70 arrow-link">Zpět na seznam lektorů.</NuxtLink>
            </article>
        </div>
    </div>
</template>