import { FC, useEffect, useState, useRef } from "react";

import { IsMobile } from "../utils/utils";
import { useCard } from "../context/Cards";
import { Button } from "./ui/button";
import Language from "./language";

type props = {
  setFlashing: React.Dispatch<React.SetStateAction<boolean>>;
};

const Video: FC<props> = ({ setFlashing }) => {
  const video = useRef<HTMLVideoElement>(null);
  const [language, setLanguage] = useState("EN");

  const [error, setError] = useState<string>("");

  const { isLoading, FetchCards } = useCard();

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
      facingMode: IsMobile() ? "environment" : "user",
    },
    audio: false,
  };

  const screenshot = () => {
    const CROP = 300;

    const canvas = document.createElement("canvas");

    const width = video.current!.videoWidth;
    const height = video.current!.videoHeight;

    canvas.width = width;
    canvas.height = height;

    canvas
      .getContext("2d")!
      .drawImage(video.current!, 0, 0, width, CROP, 0, 0, width, CROP);

    const base64 = canvas.toDataURL("image/jpg");

    const formated = base64.slice(22, base64.length);

    FetchCards(formated, language)
      .then(() => setFlashing(false))
      .catch(() => setFlashing(true));
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

  if (error != "") {
    return (
      <div>
        <p className="font-bold m-auto p-10 w-3/4 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        isLoading() ? "animate-pulse" : ""
      } flex flex-col items-center gap-6`}
    >
      <video
        ref={video}
        autoPlay
        playsInline
        className={"rounded-lg "}
        controls={false}
      />
      <div className="flex flex-col items-center gap-5">
        <Language language={language} setLanguage={setLanguage} />
      </div>
      <Button onClick={screenshot} disabled={isLoading()}>
        Flash the card
      </Button>
    </div>
  );
};

export default Video;
