import { useEventListener, useWindowScroll } from '@vueuse/core';

export const useScrollAnimation = (element: Ref<HTMLElement | null>, keyframes: Keyframe[], steps: number = 1000) => {
  const { y } = useWindowScroll();

  const scrollPercentage = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    return Math.max(0, Math.min(1, y.value / maxScroll));
  };

  watch(
    () => element.value,
    (newElement) => {
      if (!newElement) return;
      const animation = newElement.animate(keyframes, {
        duration: steps,
        fill: 'both',
      });
      animation.pause();

      const syncAnimationWithScroll = () => (animation.currentTime = scrollPercentage() * steps);

      useEventListener(window, 'scroll', syncAnimationWithScroll, { passive: true });
      syncAnimationWithScroll();
    },
    { immediate: true },
  );
};
