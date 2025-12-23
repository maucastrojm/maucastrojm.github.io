const useSections = (options: { sectionIds: string[] }) => {
  const { sectionIds } = options;
  const activeSection = ref<string | null>(null);

  const updateActiveSection = () => {
    if (!sectionIds || sectionIds.length === 0) return;

    const sections = sectionIds
      .map((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const viewportHeight = window.innerHeight;

        // Consider a section active if its center point is in the middle 50% of the viewport
        const elementCenter = elementTop + rect.height / 2;
        const viewportCenter = viewportHeight / 2;

        return {
          id: sectionId,
          distanceFromCenter: Math.abs(elementCenter - viewportCenter),
          isVisible: elementTop < viewportHeight && elementBottom > 0,
        };
      })
      .filter(Boolean);

    // Find the section closest to viewport center among visible sections
    const visibleSections = sections.filter((s) => s?.isVisible);

    // If no visible sections, default to the first one
    if (visibleSections.length === 0) {
      if (!activeSection.value && sectionIds.length > 0) {
        activeSection.value = sectionIds[0] || null;
      }
      return;
    }

    const closestSection = visibleSections.reduce((closest, current) => {
      if (!current) return closest;
      return current.distanceFromCenter < (closest?.distanceFromCenter ?? Infinity) ? current : closest;
    });

    if (closestSection?.id && closestSection.id !== activeSection.value) {
      activeSection.value = closestSection.id;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveSection);
  });

  return {
    activeSection,
    updateActiveSection,
  };
};

export default useSections;
