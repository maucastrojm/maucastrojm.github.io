const useSections = (options: { sectionIds: string[] }) => {
  const { sectionIds } = options;
  const activeSection = ref<string | null>(null);

  interface SectionInfo {
    id: string;
    distanceFromCenter: number;
    isVisible: boolean;
  }

  const getSectionInfo = (sectionId: string): SectionInfo | null => {
    const element = document.getElementById(sectionId);
    if (!element) return null;

    const rect = element.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    const viewportHeight = window.innerHeight;

    const elementCenter = elementTop + rect.height / 2;
    const viewportCenter = viewportHeight / 2;

    return {
      id: sectionId,
      distanceFromCenter: Math.abs(elementCenter - viewportCenter),
      isVisible: elementTop < viewportHeight && elementBottom > 0,
    };
  };

  const getClosestSection = (sections: SectionInfo[]) => {
    return sections.reduce((closest, current) => {
      if (!current) return closest;
      return current.distanceFromCenter < (closest?.distanceFromCenter ?? Infinity) ? current : closest;
    });
  };

  const syncActiveSection = () => {
    if (!sectionIds || sectionIds.length === 0) return;

    const sections = sectionIds.map((sectionId) => getSectionInfo(sectionId));
    const visibleSections = sections.filter((s) => s != null && s.isVisible);

    // If no sections are visible, default to the first section
    if (visibleSections.length === 0 && !activeSection.value && sectionIds[0]) {
      activeSection.value = sectionIds[0];
    } else {
      const closestSection = getClosestSection(visibleSections as SectionInfo[]);

      if (closestSection && closestSection.id !== activeSection.value) {
        activeSection.value = closestSection.id;
      }
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', syncActiveSection, { passive: true });
    syncActiveSection();
  });

  onUnmounted(() => window.removeEventListener('scroll', syncActiveSection));

  return {
    activeSection,
    updateActiveSection: syncActiveSection,
  };
};

export default useSections;
