import React from 'react';
import TaskStats from './TaskStats';

const App = () => {
  console.log("App.jsx está siendo ejecutado");
  return (
    <div>
      <h1>Task Stats Microfrontend</h1>
      <TaskStats />
    </div>
  );
};

export default App;