<template>
    <div class="full-page flex">
        <section class="background-teacher w-1/2" />
        <section class="w-1/2 p-16">
            <slot />
        </section>
    </div>
</template>
<style scoped>
.background-teacher {
    background-image: url('../assets/img/teacher.jpeg');
}
</style>