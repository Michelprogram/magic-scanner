import { FC, useEffect, useState } from "react";
import { IsMobile } from "../utils/utils";
import { useCard } from "../context/Cards";
import Carousel from "./caroussel";

interface props {
  video: React.RefObject<HTMLVideoElement>;
}

const Video: FC<props> = ({ video }) => {
  const [error, setError] = useState<string>("");
  const { GetLoading, GetImages } = useCard();

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

  const classNameLoading = () => {
    return GetLoading() ? "animate-pulse" : "";
  };

  const hidden = (condition: boolean) => {
    return condition ? " hidden" : "";
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <div>
      {error != "" ? (
        <p className="font-bold m-auto p-10 w-3/4 text-center">{error}</p>
      ) : (
        <div className={classNameLoading()}>
          <video
            ref={video}
            autoPlay
            playsInline
            className={"rounded-lg " + hidden(GetImages().length > 0)}
          />
          <Carousel className={hidden(GetImages().length == 0)} />
        </div>
      )}
    </div>
  );
};

export default Video;
