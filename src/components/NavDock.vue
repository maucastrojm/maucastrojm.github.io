<script setup lang="ts">
import type { UiDockIcon } from '@/components/ui/dock';
import { BriefcaseBusinessIcon, HomeIcon, MailIcon, PencilRulerIcon } from 'lucide-vue-next';
import { computed, type Component } from 'vue';

interface NavLink {
  path: string;
  icon: Component;
}

const links: NavLink[] = [
  { path: 'intro', icon: HomeIcon },
  { path: 'projects', icon: BriefcaseBusinessIcon },
  { path: 'skills', icon: PencilRulerIcon },
  { path: 'contact', icon: MailIcon },
];

const sectionIds = computed(() => links.map((link) => link.path));

const { activeSection } = useSections({
  sectionIds: sectionIds.value,
});
</script>
<template>
  <UiDock orientation="vertical" class="fixed ml-8" :magnification="0">
    <RouterLink v-for="link in links" :key="link.path" :to="'#' + link.path">
      <UiDockIcon :active="activeSection === link.path">
        <Component :is="link.icon" />
      </UiDockIcon>
    </RouterLink>
  </UiDock>
</template>
