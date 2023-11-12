<script setup lang="ts">
const { data } = await useFetch('/api/api')
</script>
<template>
{{ data }}
</template>