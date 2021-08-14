import App from './App.vue';
import { createApp } from "vue";

import 'normalize.css';
import './css/index.css';

const container = document.querySelector('#app');
const app = createApp(App);
app.mount(container);
