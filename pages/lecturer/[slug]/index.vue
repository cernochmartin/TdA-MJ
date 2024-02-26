<script setup lang="ts">
import type { Body } from '@/types/lecturer'
import { v4 as uuidv4 } from 'uuid'
const myUuid = uuidv4()

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

const teacherData = reactive<any>({
    title_before: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    title_after: '',
    picture_url: '',
    location: '',
    bio: '',
    claim: '',
    price_per_hour: '',
    tag: '',
    tags: [] as {
        name: string,
        uuid: string
    }[],
    contact: {
        emails: [] as string[],
        telephone_numbers: [] as string[]
    },
    emails: '',
    telephone_numbers: ''
})

async function editLecturer() {

    if (teacherData.tag) {
        const tags = teacherData.tag.replace(/\s/g, '').split(',')
        tags.forEach(tag => {
            teacherData.tags.push({
                name: tag,
                uuid: myUuid
            })
        })
    }

    teacherData.contact.emails = teacherData.emails.replace(/\s/g, '').split(',')
    teacherData.contact.telephone_numbers = teacherData.telephone_numbers.replace(/\s/g, '').split(',')
    teacherData.emails = undefined
    teacherData.telephone_numbers = undefined
    teacherData.tag = undefined
    teacherData.price_per_hour = Number(teacherData.price_per_hour)

    const { data } = await useFetch(`/lecturers/${uuid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: { ...teacherData }
    })
}

async function deleteLecturer() {
    const { data } = await useFetch(`/lecturers/${uuid}`, {
        method: 'DELETE'
    })
    popup.value = true
}

const editMode = ref(false)
</script>
<template>
    <section v-for="lecturer in body" :key="lecturer.lecturer_uuid" class="container pt-32">
        <h1 v-if="!editMode">{{ lecturer.title_before }} {{ lecturer.first_name }} {{ lecturer.middle_name }} {{
            lecturer.last_name }} {{ lecturer.title_after }}</h1>
        <h1 v-else>
            <input type="text" :placeholder="lecturer.title_before" />
            <input type="text" :placeholder="lecturer.first_name" />
            <input type="text" :placeholder="lecturer.middle_name" />
            <input type="text" :placeholder="lecturer.last_name" />
            <input type="text" :placeholder="lecturer.title_after" />
        </h1>
        <h2 v-if="!editMode">{{ lecturer.claim }}</h2>
        <h2 v-else><input v-model="teacherData.claim" type="text" :placeholder="lecturer.claim" /></h2>
        <hr class="h-0.5 bg-prussian">
        <div class="flex justify-between pt-16">
            <div class="w-1/3">
                <img v-if="lecturer.picture_url" :src="`${lecturer.picture_url}`" alt="Fotka lektora"
                    class="h-[320px] w-[320px] rounded-xl" />
                <img v-else src="@/assets/img/team.png" alt="Fotka lektora" class="h-[320px] w-[320px] rounded-xl" />
            </div>
            <div class="w-2/3 flex flex-col gap-6">
                <p v-if="!editMode">
                    {{ lecturer.bio }}
                </p>
                <textarea v-else v-model="teacherData.bio" :placeholder="lecturer.bio" />
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col gap-1">
                        <span class="text-prussian/70">Místo pobytu lektora:</span>
                        <span v-if="!editMode">{{ lecturer?.location }}</span>
                        <input v-else type="text" :placeholder="lecturer?.location" v-model="teacherData.location">
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-prussian/70">Plat za hodinu:</span>
                        <span v-if="!editMode">{{ lecturer?.price_per_hour }} Kč</span>
                        <input v-else type="text" :placeholder="lecturer?.price_per_hour + ` Kč`"
                            v-model="teacherData.price_per_hour" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-prussian/70">E-mail:</span>
                        <div v-if="!editMode" class="flex gap-2">
                            <NuxtLink v-for="email in lecturer.contact?.emails" :to="`mailto:${email}`">{{ email }}
                            </NuxtLink>
                        </div>
                        <div v-else class="flex gap-2">
                            <input v-for="email in lecturer.contact?.emails" :placeholder="`${email}`" />
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
        <div class="grid grid-cols-[1fr,1fr,1fr,1fr] gap-2 py-6">
            <span v-for="tag in lecturer.tags"
                class="bg-sky px-1 py-2 flex text-center justify-center items-center shadow-xl rounded-md">{{ tag.name }}
            </span>
        </div>
        <div class="flex justify-end">
            <div class="flex gap-6">
                <button v-show="editMode" @click="editMode = !editMode"
                    class="animation-up bg-error/70 w-[160px] py-2 rounded-md">Ukončit úpravu</button>
                <button v-if="editMode" @click="popup = true"
                    class="animation-up bg-success w-[160px] py-2 rounded-md">Uložit úpravu</button>
                <button v-else @click="editMode = !editMode"
                    class="animation-up bg-sunglow w-[100px] py-2 rounded-md">Upravit</button>
                <button @click="deleteLecturer()"
                    class="animation-up bg-error w-[100px] py-2 rounded-md text-white">Vymazat</button>
                <NuxtLink :to="`/lecturer/${uuid}/calendar`"
                    class="text-center text-white animation-up bg-prussian w-[200px] py-2 rounded-md">
                    Naplánovat schůzi
                </NuxtLink>
            </div>
        </div>
    </section>
    <div v-show="popup" class="background-overlay h-full">
        <div class="flex items-center">
            <article
                class="bg-white text-center mx-auto min-h-[240px] min-w-[480px] max-w-[800px] rounded-xl flex flex-col gap-6 p-6 opacity-90">
                <div class="text-2xl w-full flex justify-end">
                    <NuxtLink to="/lecturer">&#10006;</NuxtLink>
                </div>
                <h2 class="text-success">Úprava momentálně není implementována.</h2>
                <NuxtLink to="/lecturer" class="text-prussian/70 arrow-link">Zpět na seznam lektorů.</NuxtLink>
            </article>
        </div>
    </div>
</template>