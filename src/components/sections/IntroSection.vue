<script setup lang="ts">
import content from '@/assets/content';
import { MailIcon, FileTextIcon } from 'lucide-vue-next';
</script>
<template>
  <div class="flex">
    <div class="flex-1 p-8">
      <h1 class="text-5xl font-extrabold">{{ content.aboutMe.name }}</h1>
      <h2 class="text-2xl">{{ content.aboutMe.roles[0] }}</h2>
      <UiButton class="mt-8" size="lg">{{ content.actions.contactMe }}</UiButton>
    </div>
    <div class="flex-1 p-8">
      <h2 class="text-4xl mt-4">{{ content.sections.aboutMe }}</h2>
      <p class="mt-4">{{ content.aboutMe.bio }}</p>
      <div class="flex gap-4 mt-8">
        <UiButton variant="outline">Github</UiButton>
        <UiButton variant="outline">LinkedIn</UiButton>
        <UiButton variant="outline">
          <FileTextIcon />
        </UiButton>
        <UiButton variant="outline">
          <MailIcon />
        </UiButton>
      </div>
    </div>
  </div>
</template>
