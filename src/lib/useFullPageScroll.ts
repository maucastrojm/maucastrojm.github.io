import { useEventListener } from '@vueuse/core';

export function useFullPageScroll() {
  const isScrolling = ref(false);
  const currentSection = ref(0);

  const scrollToSection = (direction: 'up' | 'down') => {
    if (isScrolling.value) return;

    isScrolling.value = true;

    const viewportHeight = window.innerHeight;
    const currentScroll = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - viewportHeight;

    // Get current section based on scroll position
    const currentSectionIndex = Math.round(currentScroll / viewportHeight);

    const targetSection = direction === 'down' ? currentSectionIndex + 1 : currentSectionIndex - 1;

    // Calculate target scroll position
    let targetScroll = targetSection * viewportHeight;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    // Check if we can scroll
    if (
      targetScroll === currentScroll ||
      (direction === 'down' && currentScroll >= maxScroll - 5) ||
      (direction === 'up' && currentScroll <= 5)
    ) {
      isScrolling.value = false;
      return;
    }

    currentSection.value = targetSection;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });

    // Reset scrolling flag after animation completes
    setTimeout(() => {
      isScrolling.value = false;
    }, 30);
  };

  // Handle wheel events
  useEventListener(
    window,
    'wheel',
    (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 'down' : 'up';
      scrollToSection(direction);
    },
    { passive: false },
  );

  // Handle keyboard events
  useEventListener(window, 'keydown', (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown': {
        e.preventDefault();
        scrollToSection('down');

        break;
      }
      case ' ': {
        e.preventDefault();
        // Shift+Space scrolls up, Space scrolls down
        scrollToSection(e.shiftKey ? 'up' : 'down');

        break;
      }
      case 'ArrowUp':
      case 'PageUp': {
        e.preventDefault();
        scrollToSection('up');

        break;
      }
      case 'Home': {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        break;
      }
      case 'End': {
        e.preventDefault();
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: maxScroll, behavior: 'smooth' });

        break;
      }
      // No default
    }
  });

  // Handle touch events for mobile
  let touchStartY = 0;
  useEventListener(window, 'touchstart', (e: TouchEvent) => {
    if (!e.touches[0]) return;
    touchStartY = e.touches[0].clientY;
  });

  useEventListener(window, 'touchend', (e: TouchEvent) => {
    if (!e.changedTouches[0]) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 50) {
      // Swipe threshold
      const direction = diff > 0 ? 'down' : 'up';
      scrollToSection(direction);
    }
  });

  return {
    currentSection,
    isScrolling,
  };
}
