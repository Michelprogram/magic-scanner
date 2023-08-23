import { useRef, useEffect, useState } from "react";
import Video from "./components/video";
import { useCard } from "./context/Cards";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";

function App() {
  const video = useRef<HTMLVideoElement>(null);

  const [selected, setSelected] = useState(false);

  const { FetchCards, GetLoading } = useCard();

  const screenshot = () => {
    //const CROP = 300;

    const canvas = document.createElement("canvas");

    const width = video.current!.videoWidth;
    const height = video.current!.videoHeight;

    canvas.width = width;
    canvas.height = height;

    canvas
      .getContext("2d")!
      .drawImage(video.current!, 0, 0, width, height, 0, 0, width, height);

    const base64 = canvas.toDataURL("image/jpg");

    FetchCards(base64);
  };

  useEffect(() => {
    setSelected(GetLoading);
  }, [GetLoading]);

  return (
    <div className=" flex w-3/4 m-auto gap-6 flex-col items-center pt-10">
      <h1 className="text-3xl font-bold text-center">
        Magic the gathering scanner
      </h1>
      <div className=" h-fit">
        <Video video={video} />
      </div>
      <div className=" flex flex-col">
        <Button onClick={screenshot} disabled={selected}>
          Flash the card
        </Button>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
