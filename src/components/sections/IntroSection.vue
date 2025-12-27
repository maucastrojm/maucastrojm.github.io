<script setup lang="ts">
import content from '@/assets/content';
import { cn } from '@/lib/utils';
import { MailIcon, FileTextIcon } from 'lucide-vue-next';

const props = withDefaults(defineProps<{ dark?: boolean }>(), { dark: false });
</script>
<template>
  <div class="flex h-screen flex-wrap flex-col pt-40">
    <div id="title">
      <div>
        <h1 :class="cn('impact-text', { starred: !props.dark })">
          {{ content.aboutMe.name }}
        </h1>
      </div>
      <h2 v-if="dark" class="text-5xl font-light text-primary">
        <FlipWords :words="content.aboutMe.roles" :duration="5000" />
      </h2>
    </div>
    <div class="flex mt-24 justify-end z-4">
      <div id="about-me" class="max-w-[45%] text-right pt-16">
        <h2 class="text-4xl uppercase text-primary">
          {{ content.sections.aboutMe }}
        </h2>
        <p class="mt-4 whitespace-pre-line">
          {{ content.aboutMe.bio }}
        </p>
      </div>
    </div>
    <div id="actions" class="flex mt-8 flex-col">
      <div class="flex-1 z-3">
        <RouterLink to="#contact">
          <UiButton size="lg" variant="default">
            {{ content.actions.contactMe }}
          </UiButton>
        </RouterLink>
      </div>
      <div class="flex flex-1 gap-4 flex-row-reverse z-4">
        <a :href="content.links.github" target="_blank" rel="noopener noreferrer">
          <UiButton as="a" size="lg" variant="outline"> Github </UiButton>
        </a>
        <a :href="content.links.linkedin" target="_blank" rel="noopener noreferrer">
          <UiButton as="a" size="lg" variant="outline"> LinkedIn </UiButton>
        </a>
        <a :href="content.links.resume" target="_blank" rel="noopener noreferrer">
          <UiButton as="a" size="lg" variant="outline">
            <FileTextIcon />
          </UiButton>
        </a>
        <a :href="content.links.email" target="_blank" rel="noopener noreferrer">
          <UiButton as="a" size="lg" variant="outline">
            <MailIcon />
          </UiButton>
        </a>
      </div>
    </div>
  </div>
</template>
