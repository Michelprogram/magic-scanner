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

    const constraints = {
      video: {
        with: 1280,
        height: 3000,
      },
      audio: false,
    };

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
    <div className=" flex w-3/4 m-auto gap-6 flex-col items-center pt-10">
      <h1 className="text-3xl font-bold text-center">
        Magic the gathering scanner
      </h1>
      <div className=" h-fit">
        <video ref={videoRef} autoPlay playsInline className=" rounded-lg" />
      </div>
      <button
        type="button"
        className=" w-52 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Picutre
      </button>
      <p ref={para}></p>
    </div>
  );
}

export default App;
