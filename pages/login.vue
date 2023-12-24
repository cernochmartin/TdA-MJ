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
    .catch((loginError: string) => console.error(loginError))
}

if (route.query === '?type=signUp') {
    await client.auth.signUp({
        email: credentials.email,
        password: credentials.password
    })
    .then(() => { navigateTo('/') })
    .catch((loginError: string) => console.error(loginError))
}
</script>
<template>
    <article>
        <input type="text" placeholder="E-mail*" />
        <input type="text" placeholder="Heslo*" />
        <button v-if="route.query === '?type=signUp'" @click="$router.push({ query: {}})">Mam ucet, chci login</button>
        <button v-else @click="$router.push({ query: { type: 'signUp' }})">Nemam ucet</button>
    </article>
</template>