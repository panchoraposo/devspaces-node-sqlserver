import React, { useState, useEffect } from 'react';

const App = () => {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    // Establece la URL del iframe
    setIframeSrc('http://www.aframe.io');
  }, []);

  return (
    <div>
      <h1>Microfrontend Container</h1>
      <div>
        <h2>Test Iframe</h2>
        <iframe
          title="Test Iframe"
          src={iframeSrc}  // src se establece dinámicamente
          width="100%"
          height="500"
          style={{ border: "1px solid black" }}
        />
      </div>
    </div>
  );
};

export default App;