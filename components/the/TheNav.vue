<script setup lang="ts">
const props = defineProps<{
    uuid: string | undefined
}>()

async function logout() {
    await client.auth.signOut() 
    .then(() => { navigateTo('/login') })
    .catch((error) => { throw error })
}
</script>
<template>
    <nav class="flex text-white justify-between h-16 text-xl font-semibold items-center px-40"
        v-bind:class="{ 'bg-sky shadow' : $route.path !== '/' }"
    >
        <div class="w-1/3 flex justify-start">
            <NuxtLink to="/">
                <img src="~/assets/icon/TeacherDigitalAgency_LOGO_white.svg" alt="Teacher digital Agency logo" width="74" />
            </NuxtLink>
        </div>
        <div class="w-1/3 flex gap-8 justify-center">
            <NuxtLink to="/">Domů</NuxtLink>
            <NuxtLink to="/lecturer">Lektoři</NuxtLink>
            <NuxtLink :to="`/lecturer/${props?.uuid}/meetings`">Plánované schůze</NuxtLink>
        </div>
        <div class="w-1/3 flex gap-8 justify-end">
            <button @click="logout()">Odhlásit se</button>
        </div>
    </nav>
</template>