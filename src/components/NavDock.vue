<script setup lang="ts">
import type { UiDockIcon } from '@/components/ui/dock';
import { BriefcaseBusinessIcon, HomeIcon, MailIcon, PencilRulerIcon } from 'lucide-vue-next';
import type { Component } from 'vue';

const links: { path: string; icon: Component }[] = [
  { path: '/#intro', icon: HomeIcon },
  { path: '/#projects', icon: BriefcaseBusinessIcon },
  { path: '/#skills', icon: PencilRulerIcon },
  { path: '/#contact', icon: MailIcon },
];
</script>
<template>
  <UiDock orientation="vertical" class="fixed ml-8" :magnification="0">
    <RouterLink v-for="link in links" :key="link.path" :to="link.path">
      <UiDockIcon>
        <Component :is="link.icon" />
      </UiDockIcon>
    </RouterLink>
  </UiDock>
</template>
