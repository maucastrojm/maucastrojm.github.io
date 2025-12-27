export default {
  aboutMe: {
    name: 'Melody Castro',
    roles: ['Fullstack Developer', 'Software Engineer', 'Tech Enthusiast'],
    location: 'Santiago, Chile',
    bio: "Passionate about crafting efficient and scalable web applications. \
    Experienced in both frontend and backend development, with a keen interest \
    in emerging technologies and best practices in software engineering.\n\n \
    Always eager to learn and take on new challenges in the tech world. \
    Let's connect and create something amazing together!",
  },
  links: {
    github: 'https://github.com/maucastrojm',
    linkedin: 'https://www.linkedin.com/in/mcastroj/',
    email: 'mailto:mau.castrojm@gmail.com',
    resume: '/docs/resume.pdf',
  },
  sections: {
    aboutMe: 'About Me',
    projects: 'Projects Showcase (WIP)',
    skills: 'Technical Skills',
    news: 'For You (WIP)',
    contactMe: 'Contact Me',
  },
  projects: [
    {
      name: 'Azalea Portfolio',
      stack: 'Vue, Tailwind, TypeScript',
      description:
        'This site is my personal portfolio website showcasing my projects, skills, \
        and experience as a fullstack developer. Still a work in progress, so any feedback is welcome! \n\n \
        It reflects my pride as an engineer and designer, made with attention \
        to detail and by hand (using minor AI assistance). \n\n \
        The initial UI design was done by me using Figma, and the site is built \
        with Vue 3, TypeScript, Tailwind CSS and the awesome headless UI library ShadCN',
      link: 'https://github.com/maucastrojm/maucastrojm.github.io',
      picture: '/img/portfolio.png',
    },
    {
      name: 'Nugget Social',
      stack: 'Nuxt, PrismaORM, PostgreSQL',
      description:
        'Self hostable microblogging platform built with Nuxt, PrismaORM and Vue 3. \
        It features user authentication, content creation, commenting, donations and browsing. \n\n \
        The platform is designed to be lightweight and easy to deploy on personal servers, while focusing \
        on customizability and key features.  \n\n \
        The project is still not public, but you can reach out to me if you are interested in it!',
      link: null,
      picture: '/img/project.jpg',
    },
    {
      name: 'Nugget Social',
      stack: 'Nuxt, PrismaORM, PostgreSQL',
      description:
        'A data analytics platform that provides insights and visualizations \
        for business intelligence.',
      link: '',
      picture: '/img/project.jpg',
    },
    {
      name: 'Nugget Social',
      stack: 'Nuxt, PrismaORM, PostgreSQL',
      description:
        'A data analytics platform that provides insights and visualizations \
        for business intelligence.',
      link: '',
      picture: '/img/project.jpg',
    },
  ],
  skills: [
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'Vue.js', level: 'Advanced' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Python', level: 'Intermediate' },
  ],
  actions: {
    contactMe: 'Get In Touch',
    seeMore: 'See More',
  },
  contactForm: {
    name: 'Your Name',
    email: 'Your Email',
    subject: 'Email Subject',
    message: 'Email Message',
    send: `Let's talk`,
  },
  news: [
    {
      title: 'Embracing TypeScript in Modern Web Development',
      author: 'Melody Castro',
      date: '2024-05-10',
      href: '',
    },
    {
      title: 'Top 10 Vue.js Tips for Building Scalable Applications',
      author: 'Melody Castro',
      date: '2024-04-22',
      href: '',
    },
    {
      title: 'Understanding RESTful APIs: A Beginner’s Guide',
      author: 'Melody Castro',
      date: '2024-03-15',
      href: '',
    },
  ],
};
