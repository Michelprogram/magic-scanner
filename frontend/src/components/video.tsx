import { FC, useEffect, useState } from "react";

interface props {
  video: React.RefObject<HTMLVideoElement>;
}

const Video: FC<props> = ({ video }) => {
  const [error, setError] = useState<string>("");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const constraints: MediaStreamConstraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440,
      },
      facingMode: isMobile ? "environment" : "user",
    },
    audio: false,
  };

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (video.current) {
        video.current.srcObject = stream;
      }
    } catch (error) {
      setError("Error accessing webcam : " + error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <div>
      {error != "" ? (
        <p className="font-bold m-auto p-10 w-3/4 text-center">{error}</p>
      ) : (
        <video ref={video} autoPlay playsInline className="rounded-lg" />
      )}
    </div>
  );
};

export default Video;
