import { useEventListener, useWindowScroll } from '@vueuse/core';

const useScrollSnap = (options: { touchThreshold?: number } = {}) => {
  const { touchThreshold = 50 } = options;
  const { y: scrollY } = useWindowScroll();
  const currentSection = ref(0);
  const touchStartY = ref(0);

  const isOutOfBounds = (target: 'up' | 'down', targetPosition: number, maxPosition: number) => {
    return (
      targetPosition === scrollY.value ||
      (target === 'down' && scrollY.value >= maxPosition - 5) ||
      (target === 'up' && scrollY.value <= 5)
    );
  };

  const navigate = (target: 'up' | 'down' | 'top' | 'bottom') => {
    const viewportHeight = window.innerHeight;
    const maxPosition = document.documentElement.scrollHeight - viewportHeight;

    if (target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentSection.value = 0;
      return;
    } else if (target === 'bottom') {
      window.scrollTo({ top: maxPosition, behavior: 'smooth' });
      currentSection.value = Math.floor(maxPosition / viewportHeight);
      return;
    }

    const currentSectionIndex = Math.round(scrollY.value / viewportHeight);
    const targetSection = currentSectionIndex + (target === 'down' ? 1 : -1);

    let targetPosition = targetSection * viewportHeight;
    targetPosition = Math.max(0, Math.min(targetPosition, maxPosition));

    if (isOutOfBounds(target, targetPosition, maxPosition)) return;

    currentSection.value = targetSection;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  useEventListener(
    window,
    'wheel',
    (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 'down' : 'up';
      navigate(direction);
    },
    { passive: false },
  );

  useEventListener(window, 'keydown', (e: KeyboardEvent) => {
    const downKeys = ['ArrowDown', 'PageDown', ' '];
    const upKeys = ['ArrowUp', 'PageUp'];
    const topKeys = ['Home'];
    const bottomKeys = ['End'];
    const isShiftSpace = e.key === ' ' && e.shiftKey;
    if (isShiftSpace || upKeys.includes(e.key)) {
      e.preventDefault();
      navigate('up');
    } else if (downKeys.includes(e.key)) {
      e.preventDefault();
      navigate('down');
    } else if (topKeys.includes(e.key)) {
      e.preventDefault();
      navigate('top');
    } else if (bottomKeys.includes(e.key)) {
      e.preventDefault();
      navigate('bottom');
    }
  });

  useEventListener(window, 'touchstart', (e: TouchEvent) => {
    if (!e.touches[0]) return;
    touchStartY.value = e.touches[0].clientY;
  });

  useEventListener(window, 'touchend', (e: TouchEvent) => {
    if (!e.changedTouches[0]) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.value - touchEndY;

    if (Math.abs(diff) > touchThreshold) {
      const direction = diff > 0 ? 'down' : 'up';
      navigate(direction);
    }
  });
};

export default useScrollSnap;
