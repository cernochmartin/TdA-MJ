<script setup lang="ts">
const client = useSupabaseClient()

definePageMeta({
  layout: false
})

const links = [
  {
    text: 'O nás',
    link: '/#about'
  },
  {
    text: 'Seznam lektorů',
    link: '/lecturer'
  }
]

const currentUser = await client.auth.getSession()
</script>
<template>
  <div class="teacher-background">
    <TheNav :uuid="currentUser.data.session?.user?.id" />
    <section class="container">
      <header class="pt-32 text-white w-[480px]">
        <h1>Vítejte na portále Teacher digital Agency</h1>
        <p>Hledáte doučování, či nového lektora do školy? Teacher digital Agency je to pravé místo. Ze stovek učitelských profilů si vyberte tu nejlepší volbu pro Vás!</p>
      </header>
      <div class="flex gap-6 pt-8 ">
        <BaseButton v-for="link in links" :key="link.text" :text="link.text" :link="link.link" />
      </div>
    </section>
  </div>
  <section class="container">
    <div class="flex justify-center">
      <article id="about" class="-mt-64 p-8 flex flex-col gap-4 bg-white w-[1080px] rounded-xl border-sky border-2">
        <h2>Dostupné vzdělání pro každého</h2>
        <p>Teacher digital Agency je platforma, která propojuje učitele s jednotlivými studenty, v rámci doučování, ale také s velkými organizacemi, pro dlouhodobou spolupráci. Každý zaregistrovaná lektor má u nás profil, na kterém můžete najít jednotlivé předměty, co daný učitel vyučuje, kontakty pro jednoduché spojení a mnoho víc informací, podle kterých naleznete toho nejideálnějšího učitele.</p>
        <NuxtLink to="/lecturer" class="arrow-link text-prussian/70">Propojte se s lektorem</NuxtLink>
      </article>
    </div>
    <div class="pt-32 flex flex-col gap-8">
      <div class="flex gap-8">
        <div class="w-1/3 p-4 rounded-xl border-sky border-2 h-[300px] overflow-hidden flex items-center justify-center">
          <img src="~assets/img/team.png" class="rounded-xl object-cover h-[280px]"/>
        </div>
        <div class="w-2/3">
          <LecturerCard text="Náš tým se skládá z vášnivých lidí, kteří věří, že jednou z nejdůležitější věcí na světě je seberozvoj a kvalita, kterou dnešní školství dodává je nedostačující, a to především prostředkům, které jsou poskytována našim kantorům. Tudíž jsme vzali věc do vlastních rukou a snažíme se alespoň tuto část zlepšit. Věříme, že toto je pouze jedním z mnoha krůčkům ke zlepšení dnešního školství, a tudíž zlepšení každodenního života." from="Ing. Pavel Jech, spoluzakladatel TdA" />
        </div>
      </div>
      <div class="flex gap-8">
        <div class="w-2/3">
          <LecturerCard text="Jako největší problém vnímáme nedostatek kantorů, a proto sne snažíme co nejvíce pomáhat začínajícím kantorům. Pořádáme měsíční přednášky od zkušených lektorů. Součástí přednášek jsou také kurzy pro studenty, se kterýma necháváme pracovat právě začínající kantory, aby mohli nastoupit i se zkušenostmi z praxe." from="Bc. Alexandra Dostálová, spoluzakladatelka TdA" />
        </div>
        <div class="w-1/3 p-4 rounded-xl border-sky border-2 h-[300px] overflow-hidden flex items-center justify-center">
          <img src="~assets/img/lecturer.png" class="rounded-xl object-cover h-[280px]" />
        </div>
      </div>
    </div>
    <div class="pt-32">
      <h2>Kontaktujte nás a navažte spolupráci</h2>
      <div class="flex gap-8 justify-between py-12">
        <div class="w-1/3 flex justify-start">
          <div class="flex flex-col gap-2">
            <span class="text-prussian/70">Napište nám</span>
            <hr class="h-0.5 bg-prussian">
            <NuxtLink to="mailto:info@tda.cz?subject=Kontakt přes web" class="arrow-link">info@tda.cz</NuxtLink>
          </div>
        </div>
        <div class="w-1/3 flex justify-center">
          <div class="flex flex-col gap-2">
            <span class="text-prussian/70">Zavolejte nám</span>
            <hr class="h-0.5 bg-prussian">
            <span>+420 123 456 789</span>
          </div>
        </div>
        <div class="w-1/3 flex justify-end">
          <div class="flex flex-col gap-2">
            <span class="text-prussian/70">Propojte se s lektorem</span>
            <hr class="h-0.5 bg-prussian">
            <NuxtLink to="/lecturer" class="arrow-link">Přejít na stránku s lektory</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
  <TheFooter />
</template>
<style scoped>
.teacher-background {
  background-image: url('~/assets/img/teacher_background.jpg');
  background-repeat: no-repeat;
}
</style>