<script setup lang="ts">
import '@/assets/styles/app.css';
import '@/assets/styles/tailwind.css';
import { cn } from '@/lib/utils';
import { useDark } from '@vueuse/core';

const isDark = useDark();
</script>
<template>
  <div :class="cn('bg-background', { dark: isDark })">
    <NavDock />
    <RouterView />
  </div>
</template>
<style scoped></style>
