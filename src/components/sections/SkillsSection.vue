<script setup lang="ts">
import content from '@/assets/content';
</script>
<template>
  <div class="flex h-screen flex-wrap flex-col pt-40">
    <h2 class="text-4xl uppercase text-primary">
      {{ content.sections.skills }}
    </h2>
    <div class="w-full flex gap-4 pt-16 flex-wrap justify-center">
      <div
        v-for="skill in content.skills"
        :key="skill.name"
        class="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow grow min-w-1/4 max-w-1/3">
        <h3 class="font-semibold">
          {{ skill.name }}
        </h3>
        <p class="mt-2">
          {{ skill.level }}
        </p>
      </div>
    </div>
  </div>
</template>
