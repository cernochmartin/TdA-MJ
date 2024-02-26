<script setup lang="ts">
defineProps(['error'])
const error = useError()

const handleError = () => {
  clearError({
    redirect: '/'
  })
}

useSeoMeta({
  title: 'Teacher digital Agency | ' + `${error.value?.message}`,
  ogTitle: 'Teacher digital Agency | ' + `${error.value?.message}`,
  description: 'Teacher digital Agency chybová stránka ' + `${error.value?.message}.`,
  ogDescription: 'Teacher digital Agency chybová stránka ' + `${error.value?.message}.`
})
</script>
<template>
    <div class="container">
        <article class="shadow-2xl rounded-xl text-center mt-24 p-8 flex flex-col gap-2 px-8">
            <h2>Ooops...</h2>
            <h3>Error {{ error?.statusCode }}</h3>
            <h3 v-if="error?.statusCode === 404">Tady žádného lektora nenajdete...</h3>
            <div class="flex flex-col gap-4">
            <p>{{ error?.message }}</p>
            <div class="flex justify-center">
                <span @click="handleError()"
                class="animation-up cursor-pointer w-28 h-10 flex items-center justify-center rounded-md text-xl text-white bg-prussian">
                Jít zpět</span>
            </div>    
            </div>
        </article>
    </div>
  <TheFooter />
</template>