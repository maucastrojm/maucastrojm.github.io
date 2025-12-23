<script setup lang="ts">
import content from '@/assets/content';
import { cn } from '@/lib/utils';

const props = withDefaults(defineProps<{ dark?: boolean }>(), { dark: false });
</script>
<template>
  <div class="flex h-screen flex-wrap flex-col pt-40">
    <div>
      <StarsBackground v-if="!props.dark" class="w-full h-[400%] absolute inset-0 mix-blend-screen z-2" />
      <h1 :class="cn('impact-text', { starred: !props.dark })">
        {{ content.sections.contactMe }}
      </h1>
    </div>
    <div class="flex mt-24 gap-4 z-3">
      <div class="flex-1">
        <UiFieldSet>
          <UiFieldGroup class="gap-2">
            <UiField>
              <UiFieldLabel for="name">{{ content.contactForm.name }}</UiFieldLabel>
              <UiInput id="name" type="text" placeholder="Jane Doe" />
            </UiField>
            <UiField>
              <UiFieldLabel for="email">{{ content.contactForm.email }}</UiFieldLabel>
              <UiInput id="email" type="email" placeholder="jane.doe@example.com" />
            </UiField>
            <UiField>
              <UiFieldLabel for="subject">{{ content.contactForm.subject }}</UiFieldLabel>
              <UiInput id="subject" type="text" placeholder="Hello, I would like to..." />
            </UiField>
            <UiField>
              <UiFieldLabel for="message">{{ content.contactForm.message }}</UiFieldLabel>
              <UiTextarea id="message" placeholder="Write your message here..." rows="4" class="resize-none" />
            </UiField>
            <UiField orientation="horizontal" class="justify-end mt-4">
              <UiButton type="submit" size="lg">{{ content.contactForm.send }}</UiButton>
            </UiField>
          </UiFieldGroup>
        </UiFieldSet>
      </div>
      <div id="news" class="flex-1 text-right">
        <h2 class="text-4xl uppercase text-primary">
          {{ content.sections.news }}
        </h2>
        <a v-for="link in content.news" :key="link.href" :href="link.href" class="mt-4 inline-block hover:underline">
          <h3 class="font-medium">{{ link.title }}</h3>
          <p class="font-light">{{ link.date }} by {{ link.author }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
