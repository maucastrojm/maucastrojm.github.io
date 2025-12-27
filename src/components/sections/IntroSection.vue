<script setup lang="ts">
import content from '@/assets/content';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { MailIcon, FileTextIcon } from 'lucide-vue-next';

const props = withDefaults(defineProps<{ dark?: boolean }>(), { dark: false });
const { md } = useBreakpoints(breakpointsTailwind);
</script>
<template>
  <div class="md:flex h-screen flex-wrap flex-row md:flex-col pt-10 md:pt-40">
    <div id="title">
      <div>
        <h1 :class="cn('impact-text', { starred: !props.dark })">
          {{ content.aboutMe.name }}
        </h1>
      </div>
      <h2 v-if="dark" class="text-2xl md:text-5xl font-light text-primary">
        <FlipWords :words="content.aboutMe.roles" :duration="5000" />
      </h2>
    </div>
    <div class="flex mt-16 md:mt-24 md:justify-end z-4">
      <div id="about-me" class="md:max-w-[45%] text-left md:text-right md:pt-16">
        <h2 class="text-2xl md:text-4xl uppercase text-primary">
          {{ content.sections.aboutMe }}
        </h2>
        <p class="mt-4 whitespace-pre-line">
          {{ content.aboutMe.bio }}
        </p>
      </div>
    </div>
    <div id="actions" class="flex mt-8 flex-col">
      <div class="flex-1 z-3 text-left">
        <RouterLink to="#contact">
          <UiButton size="lg" variant="default">
            {{ content.actions.contactMe }}
          </UiButton>
        </RouterLink>
      </div>
      <div class="flex flex-1 md:flex-row-reverse gap-4 justify-center md:justify-start z-4 mt-24 md:mt-0">
        <a :href="content.links.github" target="_blank" rel="noopener noreferrer">
          <UiButton as="a" size="lg" variant="outline" :class="cn({ 'text-2xl w-12 h-12': !md })">
            <span v-if="md">Github</span>
            <FontAwesomeIcon icon="fa-brands fa-github" />
          </UiButton>
        </a>
        <a :href="content.links.linkedin" target="_blank" rel="noopener noreferrer">
          <UiButton as="a" size="lg" variant="outline" :class="cn({ 'text-2xl w-12 h-12': !md })">
            <span v-if="md">LinkedIn</span>
            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
          </UiButton>
        </a>
        <a :href="content.links.resume" target="_blank" rel="noopener noreferrer">
          <UiButton as="a" size="lg" variant="outline" :class="cn({ 'text-2xl w-12 h-12': !md })">
            <FileTextIcon class="w-[1.5rem]! h-[1.5rem]!" />
          </UiButton>
        </a>
        <a :href="content.links.email" target="_blank" rel="noopener noreferrer">
          <UiButton as="a" size="lg" variant="outline" :class="cn({ 'text-2xl w-12 h-12': !md })">
            <MailIcon class="w-[1.5rem]! h-[1.5rem]!" />
          </UiButton>
        </a>
      </div>
    </div>
  </div>
</template>
