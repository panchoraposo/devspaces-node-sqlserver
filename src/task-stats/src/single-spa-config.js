import { registerApplication, start } from 'single-spa';
import { createApp } from 'vue';
import TaskStats from './App';

// Registrar el microfrontend "task-stats"
registerApplication({
  name: 'task-stats',
  app: () => createApp(TaskStats),
  activeWhen: ['/stats'],
});

start();