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
      <h2 class="text-5xl font-light text-primary">
        {{ content.aboutMe.roles[0] }}
      </h2>
    </div>
    <div class="flex mt-24 justify-end z-4">
      <div id="about-me" class="max-w-[50%] text-right pt-16">
        <h2 class="text-4xl uppercase text-primary">
          {{ content.sections.aboutMe }}
        </h2>
        <p class="mt-4 whitespace-pre-line">
          {{ content.aboutMe.bio }}
        </p>
      </div>
    </div>
    <div id="actions" class="flex mt-8 z-3">
      <div class="flex-1">
        <UiButton size="lg">
          {{ content.actions.contactMe }}
        </UiButton>
      </div>
      <div class="flex flex-1 gap-4 flex-row-reverse">
        <UiButton size="lg" variant="outline"> Github </UiButton>
        <UiButton size="lg" variant="outline"> LinkedIn </UiButton>
        <UiButton size="lg" variant="outline">
          <FileTextIcon />
        </UiButton>
        <UiButton size="lg" variant="outline">
          <MailIcon />
        </UiButton>
      </div>
    </div>
  </div>
</template>
