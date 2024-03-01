<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
const myUuid = uuidv4()
const client = useSupabaseClient()

const userId = ref()
await client.auth.getSession().then((session) => {
    userId.value = session.data.session?.user.id
})

const { data } = await client
    .from('lecturer_db')
    .select('lecturer_uuid')
    .eq('lecturer_uuid', userId.value)

const id: string[] = []

data?.forEach((item: any) => {
    id.push(item.lecturer_uuid)
})

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
    telephone_numbers: '',
    lecturer_uuid: userId
})

const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/

const emailValidation = computed(() => {
    return emailPattern.test(teacherData.emails)
})

const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\S*)$/

const urlValidation = computed(() => {
    return urlPattern.test(teacherData.picture_url)
})

const phonePattern = /^\+?[0-9\s()-]{9,15}$/

const phoneValidation = computed(() => {
    return phonePattern.test(teacherData.telephone_numbers)
})

const popup = ref<{
    value: boolean
    type: string
}>({
    value: false,
    type: ''
})

async function createTeacher() {
    if (!urlValidation.value && !emailValidation.value && !phoneValidation.value) {
        popup.value = {
            value: true,
            type: 'url-email-phone'
        }
        return
    }
    if (!urlValidation.value && !emailValidation.value) {
        popup.value = {
            value: true,
            type: 'url-email'
        }
        return
    }
    if (!emailValidation.value && !phoneValidation.value) {
        popup.value = {
            value: true,
            type: 'email-phone'
        }
        return
    }
    if (!urlValidation.value && !phoneValidation.value) {
        popup.value = {
            value: true,
            type: 'url-phone'
        }
        return
    }
    if (!phoneValidation.value) {
        popup.value = {
            value: true,
            type: 'phone'
        }
        return
    }
    if (!urlValidation.value) {
        popup.value = {
            value: true,
            type: 'url'
        }
        return
    }
    if (!emailValidation.value) {
        popup.value = {
            value: true,
            type: 'email'
        }
        return
    }
    if (teacherData.first_name === '' || teacherData.last_name === '' || teacherData.picture_url === '' || teacherData.bio === '' || teacherData.claim === '') {
        popup.value = {
            value: true,
            type: 'error'
        }
        return
    }
    else {

        if (teacherData.tag) {
            const tags = teacherData.tag.replace(/\s/g, '').split(',')
            tags.forEach((tag: any) => {
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

        await useFetch('/lecturers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: { ...teacherData }
        })

        popup.value = {
            value: true,
            type: 'success'
        }
    }
}

useSeoMeta({
    title: 'Teacher digital Agency | Založ účet lektora',
    ogTitle: 'Teacher digital Agency | Založ účet lektora',
    description: 'Teacher digital Agency založ účet lektora',
    ogDescription: 'Teacher digital Agency založ účet lektora.'
})
</script>
<template>
    <!-- <template v-if="id[0] === userId">
        <main class="container pt-24 flex justify-center">
            <div>
                <h2 class="text-center text-error">Již máte vytvořený profil lektora.</h2>
                <NuxtLink to="/lecturer" class="arrow-link flex justify-center">Zpět na seznam lektorů.</NuxtLink>
            </div>
        </main>
    </template> -->
    <!-- <template> -->
        <section class="container">
            <h2 class="pt-32">Vytvoření profilu lektora</h2>
            <div class="pt-16 flex flex-col gap-6">
                <article class="text-jet grid grid-cols-3 gap-y-12 gap-x-16 gap-6 border-sky border-1 rounded-xl">
                    <div class="flex flex-col gap-2">
                        <label for="text">Titul před jménem:</label>
                        <input type="text" v-model="teacherData.title_before" placeholder="Titul před jménem"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">Jméno: <span class="text-sky">*</span></label>
                        <input required type="text" v-model="teacherData.first_name" placeholder="Jméno*"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">Druhé jméno: </label>
                        <input type="text" v-model="teacherData.middle_name" placeholder="Druhé jméno"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">Příjmení: <span class="text-sky">*</span></label>
                        <input required type="text" v-model="teacherData.last_name" placeholder="Příjmení*"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">Titul za jménem:</label>
                        <input type="text" v-model="teacherData.title_after" placeholder="Titul za jménem"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">URL obrázku (s HTTP(S)): <span class="text-sky">*</span></label>
                        <input required type="text" v-model="teacherData.picture_url" placeholder="URL Vašeho obrázku*"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">Místo pobytu:</label>
                        <input type="text" v-model="teacherData.location" placeholder="Místo pobytu"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">Tvrzení: <span class="text-sky">*</span></label>
                        <input type="text" v-model="teacherData.claim" placeholder="Tvrzení*"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">Cena za hodinu:</label>
                        <input type="text" v-model="teacherData.price_per_hour" placeholder="Cena na hodinu"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">Tagy (oddělte čárkou):</label>
                        <input type="text" v-model="teacherData.tag" placeholder="Tagy" class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">E-mailové adresy (oddělte čárkou):</label>
                        <input type="text" v-model="teacherData.emails" placeholder="E-mailové adresy"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="text">Telefonní číslo:</label>
                        <input type="text" v-model="teacherData.telephone_numbers" placeholder="Telefonní čísla"
                            class="border-b-2 border-sky" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="textarea">Něco o Vás: <span class="text-sky">*</span></label>
                        <textarea required type="textarea" v-model="teacherData.bio" placeholder="Něco o Vás*"
                            class="border-b-2 border-sky" />
                    </div>
                </article>
                <div class="flex justify-center">
                    <button @click="createTeacher()"
                        :disabled="!teacherData.first_name && !teacherData.last_name && !teacherData.picture_url && !teacherData.bio && !teacherData.claim"
                        class="text-white bg-prussian block text-center shadow w-[200px] p-3 rounded-md animation-up">Založit
                        profil lektora</button>
                </div>
            </div>
        </section>
    <!-- </template> -->

    <!-- Popup -->
    <div v-show="popup.value" class="background-overlay h-full">
        <div class="flex items-center">
            <article
                class="bg-white text-center mx-auto min-h-[240px] min-w-[480px] max-w-[800px] rounded-xl flex flex-col gap-6 p-6 opacity-90">
                <div class="text-2xl w-full flex justify-end">
                    <NuxtLink v-if="popup.type === 'success'" to="/lecturer">&#10006;</NuxtLink>
                    <button v-else @click="popup.value = !popup.value">&#10006;</button>
                </div>
                <template v-if="popup.type === 'success'">
                    <h2 class="text-success">Lektor byl vytvořen.</h2>
                    <NuxtLink to="/lecturer" class="text-prussian/70 arrow-link">Přejít na seznam lektorů.</NuxtLink>
                </template>
                <template v-if="popup.type === 'error'">
                    <h2 class="text-error">Zadejte všechny potřebné údaje.</h2>
                </template>
                <template v-if="popup.type === 'email'">
                    <h2 class="text-error">E-mail není ve správném formátu.</h2>
                </template>
                <template v-if="popup.type === 'url'">
                    <h2 class="text-error">URL není ve správném formátu.</h2>
                </template>
                <template v-if="popup.type === 'phone'">
                    <h2 class="text-error">Telefonní číslo není ve správném formátu.</h2>
                </template>
                <template v-if="popup.type === 'url-phone'">
                    <h2 class="text-error">URL a telefonní číslo nejsou ve správném formátu.</h2>
                </template>
                <template v-if="popup.type === 'email-phone'">
                    <h2 class="text-error">E-mail a telefonní číslo nejsou ve správném formátu.</h2>
                </template>
                <template v-if="popup.type === 'url-email'">
                    <h2 class="text-error">URL a e-mail nejsou ve správném formátu.</h2>
                </template>
                <template v-if="popup.type === 'url-email-phone'">
                    <h2 class="text-error">URL, e-mail a telefonní číslo nejsou ve správném formátu.</h2>
                </template>
            </article>
        </div>
    </div>
</template>