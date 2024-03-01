<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

const myUuid = uuidv4()
const client = useSupabaseClient()

definePageMeta({
    layout: 'auth'
})

useSeoMeta({
    title: 'Teacher digital Agency - Autentizace',
    ogTitle: 'Teacher digital Agency - Autentizace'
})

const credentials = reactive({
    email: '',
    password: ''
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
})

const type = ref(false)
const popup = ref(false)
const loginError = ref()
const signUpError = ref()
const emailData = ref()

async function login() {
    const { error } = await client.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
    })
    if (error) {
        popup.value = true
        loginError.value = error.message
    }
    else navigateTo('/')
}

async function signUp() {
    const { error } = await client.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
            data: {
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
                tag: teacherData.tag,
                emails: teacherData.emails,
                telephone_numbers: teacherData.telephone_numbers,
            }
        }
    })
    if (error) {
        popup.value = true
        signUpError.value = error.message
    }
    else {
        popup.value = true
        emailData.value = credentials.email
    }
}

const supFunc = async (client: any) => {
    await client`
        CREATE FUNCTION public.handle_new_teacher()
        RETURNS trigger AS $$
        BEGIN
            INSERT INTO public.lecturer_db(
                title_before,
                first_name,
                middle_name,
                last_name,
                title_after,
                picture_url,
                location,
                bio,
                claim,
                price_per_hour,
                tag,
                emails,
                telephone_numbers,
                lecturer_uuid
            )
        VALUES(new.id, new)
    `
}
</script>
<template>
    <header v-if="!type" class="flex justify-center">
        <img src="../assets/img/logo_black.png" alt="Logo Teacher digital agency" width="300" />
    </header>
    <div class="flex justify-center">
        <article class="pt-8 text-jet flex flex-col gap-6 border-sky border-1 rounded-xl min-w-[480px]">
            <h2 v-if="type">Registrace</h2>
            <h2 v-else>Přihlášení</h2>
            <div class="flex flex-col gap-2">
                <label for="text">Zadejte svůj e-mail: <span class="text-sky">*</span></label>
                <input type="text" placeholder="E-mail*" v-model="credentials.email" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="password">Zadejte své heslo: <span class="text-sky">*</span></label>
                <input type="password" placeholder="Heslo*" v-model="credentials.password" />
            </div>
            <div v-if="type" class="border-sky grid grid-cols-3 gap-2 border-1 rounded-xl">
                <div class="flex flex-col gap-2">
                    <label for="text">Titul před jménem</label>
                    <input type="text" v-model="teacherData.title_before" placeholder="Titul před jménem" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Jméno: <span class="text-sky">*</span></label>
                    <input required type="text" v-model="teacherData.first_name" placeholder="Jméno*" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Druhé jméno</label>
                    <input type="text" v-model="teacherData.middle_name" placeholder="Druhé jméno" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Příjmení: <span class="text-sky">*</span></label>
                    <input required type="text" v-model="teacherData.last_name" placeholder="Příjmení*" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Titul za jménem</label>
                    <input type="text" v-model="teacherData.title_after" placeholder="Titul za jménem" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">URL Vašeho obrázku: <span class="text-sky">*</span></label>
                    <input required type="text" v-model="teacherData.picture_url" placeholder="URL Vašeho obrázku*" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Místo pobytu</label>
                    <input type="text" v-model="teacherData.location" placeholder="Místo pobytu" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="textarea">Něco o lektorovi: <span class="text-sky">*</span></label>
                    <textarea required type="textarea" v-model="teacherData.bio" placeholder="Něco o Vás*" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Tvrzení: <span class="text-sky">*</span></label>
                    <input type="text" v-model="teacherData.claim" placeholder="Tvrzení*" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Cena za hodinu</label>
                    <input type="text" v-model="teacherData.price_per_hour" placeholder="Cena na hodinu" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Tagy (oddělte čárkou)</label>
                    <input type="text" v-model="teacherData.tag" placeholder="Tagy" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">E-mailové adresy (oddělte čárkou)</label>
                    <input type="text" v-model="teacherData.emails" placeholder="E-mailové adresy" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Telefonní čísla (oddělte čárkou)</label>
                    <input type="text" v-model="teacherData.telephone_numbers" placeholder="Telefonní čísla" />
                </div>
            </div>
            <hr class="h-1 text-sky bg-sky">
            <button v-if="type" @click="signUp()" :disabled="!credentials.email && !credentials.password">Zaregistrovat
                se</button>
            <button v-else @click="login()" :disabled="!credentials.email && !credentials.password">Přihlásit se</button>
            <button v-if="type" @click="type = !type">Již mám založený účet</button>
            <button v-else @click="type = !type">Nemám založený účet</button>
            <button @click="createTeacher()">create teacher</button>
        </article>
    </div>

    <!-- Popup -->
    <div v-show="popup" class="background-overlay h-full">
        <div class="flex items-center">
            <article
                class="bg-white text-center mx-auto min-h-[240px] min-w-[480px] max-w-[840px] rounded-xl flex flex-col gap-6 p-6 opacity-90">
                <div class="text-2xl w-full flex justify-end">
                    <button @click="popup = !popup">&#10006;</button>
                </div>
                <div v-if="type">
                    <h2 v-if="signUpError" class="text-error">{{ signUpError }}</h2>
                    <h2 v-else class="text-success">Byl Vám zaslán e-mail s potvrzením registrace na adresu {{ emailData }}.
                    </h2>
                </div>
                <div v-else>
                    <h2 v-if="loginError" class="text-error">{{ loginError }}</h2>
                </div>
            </article>
        </div>
</div></template>