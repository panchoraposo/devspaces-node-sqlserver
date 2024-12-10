import { registerApplication, start } from 'single-spa';

registerApplication(
  'task-list',
  () => System.import('http://localhost:50562/assets/index-BSv23PDz.js'),
  (location) => location.pathname === '/task-list'
);

registerApplication(
  'task-stats',
  () => System.import('http://localhost:50695/assets/index-Dm5OlU_O.js'),
  (location) => location.pathname === '/task-stats'
);

start();