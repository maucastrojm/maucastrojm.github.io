<script setup lang="ts">
import content from '@/assets/content';
</script>
<template>
  <div class="flex h-screen flex-wrap flex-col pt-40">
    <h1 id="title" class="text-8xl impact-text font-black uppercase text-primary">
      {{ content.sections.contactMe }}
    </h1>
    <div class="flex mt-24 justify-end">
      <div id="news" class="max-w-[40%] text-right pt-16">
        <h2 class="text-4xl uppercase text-primary">
          {{ content.sections.aboutMe }}
        </h2>
        <p class="mt-4">
          {{ content.aboutMe.bio }}
        </p>
      </div>
    </div>
  </div>
</template>
