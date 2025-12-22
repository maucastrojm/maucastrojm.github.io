<script setup lang="ts">
import '@/assets/styles/tailwind.css';
import '@/assets/styles/app.css';
import { useFullPageScroll } from '@/lib/useFullPageScroll';
import { useEventListener } from '@vueuse/core';

onMounted(() => {
  const element = document.getElementById('clipped-content');
  if (!element) return;

  // Define keyframes declaratively
  const animation = element.animate(
    [
      { clipPath: 'polygon(0% 0%, 65% 0%, 0% 50%, 0% 100%)', offset: 0 },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', offset: 0.25 },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', offset: 0.5 },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', offset: 0.75 },
      { clipPath: 'polygon(52% 0%, 100% 0%, 100% 100%, 52% 100%)', offset: 1 },
    ],
    {
      duration: 1000,
      fill: 'both',
    },
  );

  animation.pause();

  const handleScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return; // Prevent division by zero

    const scrollPercent = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    animation.currentTime = scrollPercent * 1000;
  };

  useEventListener(window, 'scroll', handleScroll, { passive: true });
  handleScroll();

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
