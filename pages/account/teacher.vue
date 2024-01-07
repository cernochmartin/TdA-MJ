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
    price_per_hour: ''
})

async function createTeacher() {
    const teacherInfo = {
        title_before: 'teacherData.title_before',
        // first_name: 'asdas',
        // middle_name: 'asda',
        // last_name: 'asda',
        // title_after: 'asdas',
        // picture_url: 'asda',
        // location: 'asdas',
        // bio: 'sada',
        // claim: 'claim',
        // price_per_hour: 111,
        // tags: [
        //     {
        //         name: 'asdasd'
        //     }
        // ],
        // contact: {
        //     telephone_numbers: ['uknow23', 'sadasd'],
        //     emails: ['sadsa', 'sdada']
        // }
    }

    const { data } = await useFetch('/lecturers', {
        method: 'POST',
        body: teacherInfo
    })

    console.log(data.value)
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
        <form class="flex flex-col">
            <input type="file" />
            <label for="text">Titul před jménem</label>
            <input type="text" v-model="teacherData.title_before" placeholder="Titul před jménem" />
            <label for="text">Jméno*</label>
            <input type="text" v-model="teacherData.first_name" placeholder="Jméno*" />
            <label for="text">Druhé jméno</label>
            <input type="text" v-model="teacherData.middle_name" placeholder="Druhé jméno" />
            <label for="text">Příjmení*</label>
            <input type="text" v-model="teacherData.last_name" placeholder="Příjmení*" />
            <label for="text">Titul za jménem</label>
            <input type="text" v-model="teacherData.title_after" placeholder="Titul za jménem" />
            <label for="text">Váš obrázek*</label>
            <input type="text" v-model="teacherData.picture_url" placeholder="Váš obrázek*" />
            <label for="text">Místo pobytu</label>
            <input type="text" v-model="teacherData.location" placeholder="Místo pobytu" />
            <label for="textarea">Něco o Vás*</label>
            <textarea type="textarea" v-model="teacherData.bio" placeholder="Něco o Vás*" />
            <label for="text">Cena za hodinu</label>
            <input type="text" v-model="teacherData.price_per_hour" placeholder="Cena na hodinu" /> 
        </form>
        <button @click="createTeacher()" class="text-white bg-prussian block text-center shadow w-[200px] p-3 rounded-md animation-up">Založit profil lektora</button>
    </section>
</template>