<script setup lang="ts">
const mySwitch = ref(true)
const myList = ref()
const myData = () => {
  mySwitch.value = !mySwitch.value
  myList.value = mySwitch.value ? useFetch('/api/api').data : 'Why not working'
}
myData()

</script>
<template>
  <pre>{{ myList }}</pre>
  <button @click="myData">{{ mySwitch }}</button>
</template>