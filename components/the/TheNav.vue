<script setup lang="ts">
const client = useSupabaseClient()

async function logout() {
    await client.auth.signOut()
        .then(() => { navigateTo('/login') })
        .catch((error) => { throw error })
}

const userId = ref()
await client.auth.getSession().then((session) => {
    userId.value = session.data.session?.user.id
})

const { data } = await client.from('lecturer_db')
    .select('lecturer_uuid')
    .eq('lecturer_uuid', userId.value)

const id: string[] = []

data?.forEach((item: any) => {
    id.push(item.lecturer_uuid)
})
</script>
<template>
    <nav class="flex text-white justify-between h-16 text-xl font-semibold items-center px-40"
        :class="{ 'bg-sky shadow': $route.path !== '/' }">
        <div class="w-1/3 flex justify-start">
            <NuxtLink to="/">
                <img src="~/assets/icon/TeacherDigitalAgency_LOGO_white.svg" alt="Teacher digital Agency logo" width="74" />
            </NuxtLink>
        </div>
        <div class="w-1/3 flex gap-8 justify-center">
            <NuxtLink to="/">Domů</NuxtLink>
            <NuxtLink to="/lecturer">Lektoři</NuxtLink>
            <NuxtLink v-if="userId === id[0]" :to='`/lecturer/${userId}/meetings`'>Plánované schůze</NuxtLink>
            <NuxtLink v-else to="/create-lecturer">Jste lektor? Vytvořte si účet</NuxtLink>
        </div>
        <div class="w-1/3 flex gap-8 justify-end">
            <button @click="logout()">Odhlásit se</button>
        </div>
    </nav>
</template>