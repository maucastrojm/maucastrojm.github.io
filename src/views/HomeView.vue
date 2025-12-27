<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const clippedContentRef = useTemplateRef('clipped-content');
const { md } = useBreakpoints(breakpointsTailwind);

useScrollSnap();
if (md.value) {
  useScrollAnimation(clippedContentRef, [
    { clipPath: 'polygon(0% 0%, 65% 0%, 0% 50%, 0% 100%)', offset: 0 },
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', offset: 0.25 },
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', offset: 0.5 },
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', offset: 0.75 },
    { clipPath: 'polygon(52% 0%, 100% 0%, 100% 100%, 52% 100%)', offset: 1 },
  ]);
}
</script>
<template>
  <div ref="clipped-content" class="bg-background absolute left-0 top-0 w-screen z-4 dark">
    <NavDock v-if="md" class="z-999" />
    <div class="flex flex-col max-w-280 mx-auto p-8 md:p-0">
      <IntroSection id="intro" dark />
      <ProjectsSection id="projects" />
      <SkillsSection id="skills" />
      <ContactMeSection id="contact" dark />
      <StarsBackground class="absolute inset-0 -z-30" />
    </div>
  </div>
  <div v-if="md" class="bg-background static">
    <NavDock class="z-3" />
    <div class="flex flex-col max-w-280 mx-auto">
      <IntroSection id="intro" />
      <ProjectsSection id="projects" />
      <SkillsSection id="skills" />
      <ContactMeSection id="contact" />
    </div>
  </div>
</template>
