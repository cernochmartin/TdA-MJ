<script setup lang="ts">
const client = useSupabaseClient()

const currentUser = await client.auth.getSession()

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

// const { data: createTeacher } = await useAsyncData('createTeacher', async () => {
//     const { data, error } = await client
//         .from('profiles_db')
//         .insert({ 
//             title_before: teacherData.title_before, 
//             first_name: teacherData.first_name,
//             middle_name: teacherData.middle_name,
//             last_name: teacherData.last_name,
//             title_after: teacherData.title_after,
//             picture_url: teacherData.picture_url,
//             location: teacherData.location,
//             bio: teacherData.bio,
//             price_per_hour: teacherData.price_per_hour
//         })

//     return data
// })
</script>
<template>
    {{ currentUser.data.session?.user.email }}
    {{ }}
    <input type="text" v-model="teacherData.title_before" />
    <input type="text" v-model="teacherData.first_name" />
    <input type="text" v-model="teacherData.middle_name" />
    <input type="text" v-model="teacherData.last_name" />
    <input type="text" v-model="teacherData.title_after" />
    <input type="text" v-model="teacherData.picture_url" />
    <input type="text" v-model="teacherData.location" />
    <textarea type="text" v-model="teacherData.bio" />
    <input type="text" v-model="teacherData.price_per_hour" />
</template>