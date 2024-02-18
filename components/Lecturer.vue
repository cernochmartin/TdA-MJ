<script setup lang="ts">
const props = defineProps<{
    uuid: string
    titleBefore?: string
    firstName: string
    middleName?: string
    lastName: string
    titleAfter?: string
    pictureUrl: string
    claim: string | undefined
    bio: string
}>()
</script>
<template>
    <article class="animation-up">
        <div class="mt-24">
            <h1>{{ props.titleBefore }} {{ props.firstName }} {{ props.middleName }} {{ props.lastName }} {{ props.titleAfter }}</h1>
        </div>
        <NuxtLink :to="`/lecturer/${uuid}`">
            <article class="rounded-lg overflow-hidden shadow-2xl flex pt-4">
                <img v-if="props.pictureUrl" :src="`${props.pictureUrl}`" alt="Fotka lektora" class="p-4 w-[300px] h-[300px]" />
                <img v-else src="@/assets/img/team.png" alt="Fotka lektora" class="p-4 w-[300px] h-[300px]" />
                <div class="p-4 flex flex-col justify-between w-full">
                    <div class="flex flex-col gap-2">
                        <span class="font-semibold">{{ props.claim }}</span>
                        <hr class="bg-prussian h-0.5 w-full">
                        <p>{{ props.bio }}</p>
                    </div>
                    <span class="arrow-link text-prussian/70">Pro více informací navštivte lektorův profil</span>
                </div>
            </article>
        </NuxtLink>
    </article>
</template>