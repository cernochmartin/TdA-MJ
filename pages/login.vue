<script setup lang="ts">
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

const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/

const emailValidation = computed(() => {
    return emailPattern.test(credentials.email)
})

const type = ref(false)
const popup = ref(false)
const loginError = ref()
const signUpError = ref()
const emailData = ref()

const query = useRoute().query

function isEmpty() {
    return Object.keys(query).length === 0
}

async function login() {
    const { error } = await client.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
    })
    if (error && emailValidation.value) {
        popup.value = true
        loginError.value = error.message
    }
    if (!emailValidation) {
        popup.value = true
    }
    if (query && emailValidation.value && !error) navigateTo('/create-lecturer')
    if (isEmpty() && emailValidation.value && !error) navigateTo('/')
}

async function signUp() {
    const { error } = await client.auth.signUp({
        email: credentials.email,
        password: credentials.password,
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
</script>
<template>
    <header class="flex justify-center">
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
            <hr class="h-1 text-sky bg-sky">
            <button v-if="type" @click="signUp()" :disabled="!credentials.email && !credentials.password">Zaregistrovat
                se</button>
            <button v-else @click="login()" :disabled="!credentials.email && !credentials.password">Přihlásit
                se</button>
            <button v-if="type" @click="type = !type">Již mám založený profil</button>
            <button v-if="!type && isEmpty()" @click="type = !type">Nemám založený profil</button>
            <NuxtLink v-if="isEmpty()" to="/" class="text-center">Chci pokračovat bez profilu</NuxtLink>
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
                    <template v-else>
                        <h2 class="text-success">Byl Vám zaslán e-mail s potvrzením registrace na adresu {{ emailData }}.
                        </h2>
                        <p>Po potvrzení se přihlašte a vytvořte si profil lektora.</p>
                    </template>
                </div>
                <div v-if="!emailValidation">
                    <h2 class="text-error">E-mail není ve správném formátu.</h2>
                </div>
                <div v-else>
                    <h2 v-if="loginError" class="text-error">{{ loginError }}</h2>
                </div>
            </article>
        </div>
    </div>
</template>