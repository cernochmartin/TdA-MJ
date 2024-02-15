<script setup lang="ts">
import dayjs from 'dayjs'

const hour = ref<number | null>(null)

const newDate = dayjs().hour() 
</script>
<template>
    {{ newDate }}
</template>