<script setup lang="ts">
const client = useSupabaseClient()

const currentUser = await client.auth.getSession()

useSeoMeta({
    title: 'Teacher digital Agency | ' + `${currentUser.data.session?.user.email}`,
    ogTitle: 'Teacher digital Agency ' + `${currentUser.data.session?.user.email}`,
    description: 'Teacher digital Agency ' + `${currentUser.data.session?.user.email}.`,
    ogDescription: 'Teacher digital Agency ' + `${currentUser.data.session?.user.email}.`
})
</script>
<template>
    <section class="container">
        {{ currentUser.data.session?.user.email }}
        <NuxtLink to="/account/teacher" class="arrow-link text-prussian/70">Jste lektor? Založte si profil lektora.</NuxtLink>
    </section>
</template>