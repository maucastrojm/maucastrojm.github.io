<script setup lang="ts">
import content from '@/assets/content';
import { cn } from '@/lib/utils';

const props = withDefaults(defineProps<{ dark?: boolean }>(), { dark: false });

const name = ref('');
const subject = ref('');
const message = ref('');

const mailToLink = computed(
  () =>
    `${content.links.email}?subject=${encodeURIComponent(
      `[${name.value}]: ${subject.value}`,
    )}&body=${encodeURIComponent(message.value)}`,
);
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
              <UiInput id="name" v-model="name" type="text" placeholder="Jane Doe" />
            </UiField>
            <UiField>
              <UiFieldLabel for="subject">{{ content.contactForm.subject }}</UiFieldLabel>
              <UiInput id="subject" v-model="subject" type="text" placeholder="Hello, I would like to..." />
            </UiField>
            <UiField>
              <UiFieldLabel for="message">{{ content.contactForm.message }}</UiFieldLabel>
              <UiTextarea
                id="message"
                v-model="message"
                placeholder="Write your message here..."
                rows="4"
                class="resize-none" />
            </UiField>
            <UiField orientation="vertical" class="text-end">
              <p class="text-foreground/70 text-sm">This will open your email client to send the message.</p>
              <a :href="mailToLink">
                <UiButton size="lg">{{ content.contactForm.send }}</UiButton>
              </a>
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
