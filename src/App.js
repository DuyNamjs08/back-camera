import React, { useState, useRef, useEffect } from 'react';
import Webcam from "react-webcam"
import styled from 'styled-components'
import html2canvas from 'html2canvas';

function App() {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";
  const webcamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);


  const videoConstraints = {
    facingMode: FACING_MODE_USER
  };
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const handleClick = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);
  const handleStartStream = () => {
    setIsStreaming(true);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
  };
  const handleTakePhoto = () => {
    html2canvas(document.querySelector('#webcam-container')).then((canvas) => {
      const imgData = canvas.toDataURL();
      setImgSrc(imgData);
    });
  };
  return (
    <Container>
      <button onClick={handleClick}>Switch camera</button>
      {isStreaming ? (
        <div id="webcam-container" style={{ position: 'relative' , height: '240px', width: '320px' }}>
        <Webcam
            audio={false}
            webcamRef={webcamRef}
            screenshotFormat="image/jpeg"
            forceScreenshotSourceSize="true"
            videoConstraints={{
              ...videoConstraints,
              facingMode
            }}
          />
        <button onClick={handleStopStream}>Stop Streaming</button>
        <button onClick={handleTakePhoto}>Take Photo</button>
        {imgSrc && <img src={imgSrc} />}
      </div>
      ) : (
        <button onClick={handleStartStream}>Start Streaming</button>
      )}
    </Container>
  );
}
const Container = styled.div`
#webcam-container{
  video {
    width: 100% !important;
  }
}
`

export default App;

;

