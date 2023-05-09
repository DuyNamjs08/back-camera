import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [facingMode, setFacingMode] = useState('user');
  const videoRef = useRef(null);

  useEffect(() => {
    async function getCameraStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCameraStream();
  }, [facingMode]);

  const switchCamera = () => {
    if (facingMode === 'user') {
      setFacingMode('environment');
    } else {
      setFacingMode('user');
    }
  };

  return (
    <div>
      <video ref={videoRef} />
      <button onClick={switchCamera}>Switch Camera</button>
    </div>
  );
}

export default App;

;

