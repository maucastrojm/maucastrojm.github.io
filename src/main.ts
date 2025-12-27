import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import App from './App.vue';
import router from './router';

library.add(faGithub, faLinkedin);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
