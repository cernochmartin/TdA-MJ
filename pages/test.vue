<script setup>
const { $mysql } = useNuxtApp()

async function getUsers() {
    const [rows] = await $mysql.query('SELECT * FROM users')
    return rows
}
// console.log(useNuxtApp())
// console.log($mysql)
const users = getUsers()
console.log(users)
</script>
<template>
    <button @click="getUsers()">adhiasd</button>
    test page
</template>