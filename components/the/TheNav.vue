<script setup lang="ts">
const client = useSupabaseClient()

async function logout() {
    await client.auth.signOut() 
    .then(() => { navigateTo('/login') })
    .catch((error) => { throw error })
}
</script>
<template>
    <nav class="flex bg-prussian text-white justify-between h-16 text-xl font-semibold items-center px-96">
        <NuxtLink to="/">
            <img src="~/assets/icon/TeacherDigitalAgency_LOGO_white.svg" alt="Teacher digital Agency logo" width="74" />
        </NuxtLink>
        <div class="flex gap-8">
            <NuxtLink to="/">Domů</NuxtLink>
            <NuxtLink to="lecturer">Lektoři</NuxtLink>
        </div>
        <div>
            <button @click="logout()">Odhlásit se</button>
        </div>
    </nav>
</template>