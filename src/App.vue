<script setup lang="ts">
import '@/assets/styles/tailwind.css';
import '@/assets/styles/app.css';
import gsap from 'gsap';
import { useFullPageScroll } from '@/lib/useFullPageScroll';

onMounted(() => {
  gsap.timeline().to('#clipped-content', {
    scrollTrigger: {
      trigger: '#clipped-content',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    keyframes: {
      '0%': { clipPath: 'polygon(0% 0%, 65% 0, 0% 50%, 0 100%)' },
      '25%': { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
      '50%': { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
      '75%': { clipPath: 'polygon(52% 0%, 100% 0%, 100% 100%, 52% 100%)' },
    },
  });
  useFullPageScroll();
});
</script>
<template>
  <div id="clipped-content" class="bg-background absolute left-0 top-0 w-screen z-9999 dark">
    <NavDock class="z-9999" />
    <div class="flex flex-col max-w-280 mx-auto">
      <RouterView />
    </div>
  </div>
  <div class="bg-background static">
    <NavDock />
    <div class="flex flex-col max-w-280 mx-auto">
      <RouterView />
    </div>
  </div>
</template>
<style scoped></style>
