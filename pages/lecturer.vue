<script setup lang="ts">
import lecturer from '../components/lecturer.json'

console.log(lecturer)
</script>
<template>
    <section class="container text-jet">
        <div class="pt-24">
            <h1>{{ lecturer.title_before }} {{ lecturer.first_name }} {{ lecturer.middle_name }} {{ lecturer.last_name }} {{ lecturer.title_after }}</h1>
        </div>
        <article class="rounded-lg overflow-hidden shadow-2xl flex">
            <img :src="`${lecturer.picture_url}`" alt="Fotka lektora" />
            <div class="p-4 flex flex-col gap-2">
                <span class="font-semibold">{{ lecturer.claim }}</span>
                <p>{{ lecturer.bio }}</p>
                <span>{{ lecturer.location }}</span>
                <span v-for="name in lecturer.tags" v-bind="name"></span>
            </div>
        </article>
    </section>
    
</template>