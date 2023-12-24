<script setup lang="ts">
import lecturer from '../components/lecturer.json'
</script>
<template>
    <section class="container text-jet">
        <div class="pt-24">
            <h1>{{ lecturer.title_before }} {{ lecturer.first_name }} {{ lecturer.middle_name }} {{ lecturer.last_name }} {{ lecturer.title_after }}</h1>
        </div>
        <article class="rounded-lg overflow-hidden shadow-2xl flex pt-4">
            <img :src="`${lecturer.picture_url}`" alt="Fotka lektora" />
            <div class="p-4 flex flex-col gap-2">
                <span class="font-semibold">{{ lecturer.claim }}</span>
                <hr class="bg-sky h-0.5">
                <p>{{ lecturer.bio }}</p>
                <span>Místo pobytu: {{ lecturer.location }}</span>
                <span>Cena za hodinu: {{ lecturer.price_per_hour }} Kč</span>
                <div class="flex">
                    <span>E-mail: 
                        <NuxtLink :to="`mailto:${email}?subject=Kontakt přes webovou stránku Teacher digital Agency`" v-for="email in lecturer.contact.emails" class="underline pl-1">{{ email }} </NuxtLink>
                    </span>
                </div>
                <span v-for="telephone_number in lecturer.contact.telephone_numbers">Telefon: {{ telephone_number }}</span>
            </div>
        </article>
        <div class="grid grid-cols-[1fr,1fr,1fr,1fr] gap-2 pt-4">
            <Tag v-for="tag in lecturer.tags" :text="tag.name" />
        </div>
    </section>
</template>