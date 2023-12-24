<script setup lang="ts">
definePageMeta({
    layout: 'auth'
})

const client = useSupabaseClient()
const route = useRoute().query

const credentials = reactive({
    email: '',
    password: ''
})

async function login() {
    await client.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
    })
    .then(() => { navigateTo('/') })
    .catch((error: string) => { throw error })
}

async function signUp() {
    await client.auth.signUp({
        email: credentials.email,
        password: credentials.password
    })
    .then(() => { navigateTo('/') })
    .catch((error: string) => { throw error })
}
</script>
<template>
    <header class="flex justify-center">
        <img src="../assets/img/logo_black.png" alt="Logo Teacher digital agency" width="300" />
    </header>
    <div class="flex justify-center">
        <article class="pt-16 text-jet flex flex-col gap-6 border-sky border-1 rounded-xl w-[480px]">
            <h2 v-if="route.type === 'signUp'">Registrace</h2>
            <h2 v-else>Příhlášení</h2>
            <div class="flex flex-col gap-2">
                <label for="text">Zadejte svůj e-mail: <span class="text-sky">*</span></label>
                <input type="text" placeholder="E-mail*" v-model="credentials.email" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="password">Zadejte své heslo: <span class="text-sky">*</span></label>
                <input type="password" placeholder="Heslo*" v-model="credentials.password" />
            </div>
            <hr class="h-1 text-sky bg-sky">
            <button v-if="route.type === 'signUp'" @click="signUp()">Zaregistrovat se</button>
            <button v-else @click="login()">Přihlásit se</button>
            <button v-if="route.type === 'signUp'" @click="$router.push({ query: {}})">Již mám založený účet</button>
            <button v-else @click="$router.push({ query: { type: 'signUp' }})">Nemám založený účet</button>
        </article>
    </div>
</template>