<script setup lang="ts">
const year = new Date().getFullYear()
</script>
<template>
    <footer class="bg-prussian flex flex-col font-semibold px-40">
        <section class="text-white py-4 flex justify-between">
            <NuxtLink to="/#about" class="flex items-center">
                <img src="assets/icon/TeacherDigitalAgency_LOGO_white.svg" alt="Logo TdA" width="72" />
            </NuxtLink>
            <div class="flex gap-8">
                <div class="flex flex-col gap-2">
                    <span class="text-white/70">Napište nám</span>
                    <NuxtLink to="mailto:info@tda.cz?subject=Kontakt přes web">info@tda.cz</NuxtLink>
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-white/70">Zavolejte nám</span>
                    <span>+420 123 456 789</span>
                </div>
            </div>
        </section>
    </footer>
    <section class="px-40 py-2">
        <span>&#169; 2023 - {{ year }}, Teacher digital Agency, všechna práva vyhrazena, vytvořil: <NuxtLink to="/lecturer/609702d1-8c68-441f-88c5-aa2c40b90938">Martin Černoch</NuxtLink></span>
    </section>
</template>