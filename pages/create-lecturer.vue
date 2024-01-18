<script setup lang="ts">
const teacherData = reactive({
    title_before: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    title_after: '',
    picture_url: '',
    location: '',
    bio: '',
    claim: '',
    price_per_hour: '',
    tag: ''
})

const teacherInfo = {
        title_before: teacherData.title_before,
        first_name: teacherData.first_name,
        middle_name: teacherData.middle_name,
        last_name: teacherData.last_name,
        title_after: teacherData.title_after,
        picture_url: teacherData.picture_url,
        location: teacherData.location,
        bio: teacherData.bio,
        claim: teacherData.claim,
        price_per_hour: teacherData.price_per_hour,
        tags: [
            {
                name: 'asdasd',
                uuid: 'uuid'
            }
        ],
        contact: {
            telephone_numbers: ['uknow23', 'sadasd'],
            emails: ['sadsa', 'sdada']
        }
    }

async function createTeacher() {
    const { data } = await useFetch('/lecturers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: teacherInfo
    })
}

useSeoMeta({
    title: 'Teacher digital Agency | Založ účet lektora',
    ogTitle: 'Teacher digital Agency | Založ účet lektora',
    description: 'Teacher digital Agency založ účet lektora',
    ogDescription: 'Teacher digital Agency založ účet lektora.'
})
</script>
<template>
    <section class="container">
        <h2 class="pt-32">Vytvoření profilu lektora</h2>
        <div class="pt-16 flex flex-col gap-6">
            <article class="text-jet grid grid-cols-3 gap-y-12 gap-x-16 gap-6 border-sky border-1 rounded-xl">
                <div class="flex flex-col gap-2">
                    <label for="text">Titul před jménem</label>
                    <input type="text" v-model="teacherData.title_before" placeholder="Titul před jménem" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Jméno*</label>
                    <input type="text" v-model="teacherData.first_name" placeholder="Jméno*" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Druhé jméno</label>
                    <input type="text" v-model="teacherData.middle_name" placeholder="Druhé jméno" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Příjmení*</label>
                    <input type="text" v-model="teacherData.last_name" placeholder="Příjmení*" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Titul za jménem</label>
                    <input type="text" v-model="teacherData.title_after" placeholder="Titul za jménem" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">URL Vašeho obrázku*</label>
                    <input type="text" v-model="teacherData.picture_url" placeholder="URL Vašeho obrázku*" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Místo pobytu</label>
                    <input type="text" v-model="teacherData.location" placeholder="Místo pobytu" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="textarea">Něco o Vás*</label>
                    <textarea type="textarea" v-model="teacherData.bio" placeholder="Něco o Vás*" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="text">Cena za hodinu</label>
                    <input type="text" v-model="teacherData.price_per_hour" placeholder="Cena na hodinu" /> 
                </div>
            </article>
            <div class="flex justify-center">
                <button @click="createTeacher()" class="text-white bg-prussian block text-center shadow w-[200px] p-3 rounded-md animation-up">Založit profil lektora</button>
            </div>
        </div>
    </section>
</template>