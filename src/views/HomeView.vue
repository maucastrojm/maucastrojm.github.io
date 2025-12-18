<template>
  <div class="flex flex-col max-w-5xl mx-auto">
    <IntroSection id="intro" />
    <ProjectsSection id="projects" />
    <SkillsSection id="skills" />
    <section id="contact" class="min-h-screen flex items-center justify-center">
      <div class="text-center space-y-4">
        <h2 class="text-3xl font-bold">Get in Touch</h2>
        <p class="text-muted-foreground max-w-md">
          I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to work
          together!
        </p>
        <div class="flex gap-4 justify-center">
          <UiButton size="lg">Send Message</UiButton>
          <UiButton variant="outline" size="lg">Download CV</UiButton>
        </div>
      </div>
    </section>
  </div>
</template>
