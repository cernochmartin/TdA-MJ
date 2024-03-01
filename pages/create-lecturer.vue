<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
const myUuid = uuidv4()
const client = useSupabaseClient()

const userId = ref()
await client.auth.getSession().then((session) => {
    userId.value = session.data.session?.user.id
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

const popup = ref(false)

async function createTeacher() {

    if(teacherData.tag){
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

    const { data } = await useFetch('/lecturers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: { ...teacherData }
    })

    popup.value = true
}

async function createLecturer() {
    await client.from('lecturer_db')
        .insert([{
            title_before: teacherData.title_before,
            first_name: teacherData.first_name,
            middle_name: teacherData.middle_name,
            last_name: teacherData.last_name,
            title_after: teacherData.title_after,
            picture_url: teacherData.picture_url,
            location: teacherData.location,
            bio: teacherData.bio,
            claim: teacherData.claim,
            price_per_hour: teacherData.price_per_hour,
            tags: teacherData.tag,
            emails: teacherData.emails,
            telephone_numbers: teacherData.telephone_numbers,
            lecturer_uuid: myUuid
        }])
}

useSeoMeta({
    title: 'Teacher digital Agency | Založ účet lektora',
    ogTitle: 'Teacher digital Agency | Založ účet lektora',
    description: 'Teacher digital Agency založ účet lektora',
    ogDescription: 'Teacher digital Agency založ účet lektora.'
})
</script>
<template>
    <section class="container">
        <h2 class="pt-32">Vytvoření profilu lektora</h2>
        <div class="pt-16 flex flex-col gap-6">
            <article class="text-jet grid grid-cols-3 gap-y-12 gap-x-16 gap-6 border-sky border-1 rounded-xl">
                <div class="flex flex-col gap-2">
                    <label for="text">Titul před jménem</label>
                    <input type="text" v-model="teacherData.title_before" placeholder="Titul před jménem" class="border-b-2 border-sky" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Jméno*</label>
                    <input required type="text" v-model="teacherData.first_name" placeholder="Jméno*" class="border-b-2 border-sky" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Druhé jméno</label>
                    <input type="text" v-model="teacherData.middle_name" placeholder="Druhé jméno" class="border-b-2 border-sky" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Příjmení*</label>
                    <input required type="text" v-model="teacherData.last_name" placeholder="Příjmení*" class="border-b-2 border-sky" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Titul za jménem</label>
                    <input type="text" v-model="teacherData.title_after" placeholder="Titul za jménem" class="border-b-2 border-sky" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">URL Vašeho obrázku*</label>
                    <input required type="text" v-model="teacherData.picture_url" placeholder="URL Vašeho obrázku*" class="border-b-2 border-sky" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Místo pobytu</label>
                    <input type="text" v-model="teacherData.location" placeholder="Místo pobytu" class="border-b-2 border-sky" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Tvrzení*</label>
                    <input type="text" v-model="teacherData.claim" placeholder="Tvrzení*" class="border-b-2 border-sky" /> 
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Cena za hodinu</label>
                    <input type="text" v-model="teacherData.price_per_hour" placeholder="Cena na hodinu" class="border-b-2 border-sky" /> 
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Tagy (oddělte čárkou)</label>
                    <input type="text" v-model="teacherData.tag" placeholder="Tagy" class="border-b-2 border-sky" /> 
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">E-mailové adresy (oddělte čárkou)</label>
                    <input type="text" v-model="teacherData.emails" placeholder="E-mailové adresy" class="border-b-2 border-sky" /> 
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Telefonní čísla (oddělte čárkou)</label>
                    <input type="text" v-model="teacherData.telephone_numbers" placeholder="Telefonní čísla" class="border-b-2 border-sky" /> 
                </div>
                <div class="flex flex-col gap-2">
                    <label for="textarea">Něco o lektorovi*</label>
                    <textarea required type="textarea" v-model="teacherData.bio" placeholder="Něco o Vás*" class="border-b-2 border-sky" />
                </div>
            </article>
            <div class="flex justify-center">
                <button 
                    @click="createTeacher()"
                    :disabled="!teacherData.first_name && !teacherData.last_name && !teacherData.picture_url && !teacherData.bio && !teacherData.claim"
                    class="text-white bg-prussian block text-center shadow w-[200px] p-3 rounded-md animation-up">Založit profil lektora</button>
            </div>
        </div>
    </section>
    <div v-show="popup" class="background-overlay h-full">
        <div class="flex items-center">
            <article class="bg-white text-center mx-auto min-h-[240px] min-w-[480px] max-w-[800px] rounded-xl flex flex-col gap-6 p-6 opacity-90">
                <div class="text-2xl w-full flex justify-end">
                    <NuxtLink to="/lecturer">&#10006;</NuxtLink>
                </div>
                <h2 class="text-success">Lektor byl vytvořen.</h2>
                <NuxtLink to="/lecturer" class="text-prussian/70 arrow-link">Přejít na seznam lektorů.</NuxtLink>
            </article>
        </div>
    </div>
</template>