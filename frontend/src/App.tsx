import { useRef, useEffect } from "react";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const para = useRef<HTMLParagraphElement>(null);

  const getMedia = async () => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      para!.current!.innerHTML = "Let's get this party started";
    }

    const constraints = { video: true, audio: false };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      //if (para.current) para.current.innerHTML = error + "";
      console.error("Error accessing webcam:", error);
    }
  };

  useEffect(() => {
    getMedia();

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream instanceof MediaStream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      }
    };
  }, []);

  return (
    <div className="App">
      <h1>Magic the gathering scanner</h1>
      <video ref={videoRef} autoPlay playsInline />
      <p ref={para}></p>
    </div>
  );
}

export default App;
