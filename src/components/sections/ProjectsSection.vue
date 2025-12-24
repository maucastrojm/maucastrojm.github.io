<script setup lang="ts">
import content from '@/assets/content';
import { cn } from '@/lib/utils';

const selectedIndex = ref(0);
const selectedProject = computed(() => content.projects[selectedIndex.value]);
</script>
<template>
  <div class="flex h-screen flex-wrap flex-col pt-40">
    <h2 class="text-4xl uppercase text-primary">
      {{ content.sections.projects }}
    </h2>
    <div class="flex pt-16 gap-x-12">
      <div class="flex-1">
        <div class="pl-2 max-h-64">
          <h3 class="font-semibold">
            {{ selectedProject?.name }}
          </h3>
          <p class="mt-2">
            {{ selectedProject?.description }}
          </p>
        </div>
        <UiButton variant="outline" class="mt-8" size="lg">
          {{ content.actions.seeMore }}
        </UiButton>
      </div>
      <div class="flex-2 flex flex-wrap gap-4">
        <UiCard
          v-for="(project, index) in content.projects"
          :key="project.name"
          class="basis-[calc(50%-(--spacing(2)))] cursor-pointer bg-transparent backdrop-blur-[2px]"
          :class="
            cn({
              'border-primary/30 bg-white/5': selectedIndex === index,
            })
          "
          @click="selectedIndex = index">
          <UiCardHeader>
            <img :src="project.picture" :alt="project.name" class="w-full h-40 object-cover mb-2 rounded-md" />
            <UiCardTitle>{{ project.name }}</UiCardTitle>
            <UiCardSubtitle>{{ project.stack }}</UiCardSubtitle>
          </UiCardHeader>
        </UiCard>
      </div>
    </div>
  </div>
</template>
