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
    <div class="flex pt-16">
      <div class="flex-1">
        <div class="pl-2 max-h-64">
          <h3 class="font-semibold">
            {{ selectedProject?.name }}
          </h3>
          <p class="mt-2">
            {{ selectedProject?.description }}
          </p>
        </div>
        <UiButton variant="outline" class="mt-8">
          {{ content.actions.seeMore }}
        </UiButton>
      </div>
      <div class="flex-2 flex relative min-h-100 justify-center">
        <div
          class="bg-violet-700 blur-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 right-0 bottom-0 rounded-full min-w-xs min-h-xs max-w-xs max-h-xs" />
        <div
          v-for="(project, index) in content.projects"
          :key="index"
          :class="
            cn(
              'w-max mt-6 border-3 border-transparent rounded-lg mr-4 shadow-md hover:shadow-lg transition-all hover:border-primary/10 bg-gray-100/40 backdrop-blur-lg',
              {
                'cursor-pointer': selectedIndex !== index,
                'border-primary/30 hover:border-primary/30 border-3': selectedIndex === index,
              },
            )
          "
          @click.prevent="selectedIndex = index">
          <div
            class="shadow-primary/40 shadow-inner shadow-inner-2xl w-full h-full p-4 rounded-md"
            :class="[{ '': selectedIndex === index }]">
            <h3 class="font-bold text-2xl">
              {{ project.name }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
