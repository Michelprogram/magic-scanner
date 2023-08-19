import { useRef } from "react";
import Video from "./components/video";
import Button from "./components/button";
import Preview from "./components/preview";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const screenshot = useRef<HTMLImageElement>(null);

  const video = useRef<HTMLVideoElement>(null);

  return (
    <div className=" flex w-3/4 m-auto gap-6 flex-col items-center pt-10">
      <h1 className="text-3xl font-bold text-center">
        Magic the gathering scanner
      </h1>
      <div className=" h-fit">
        <Video video={video} />
      </div>
      <Button
        text="Flashing the card"
        video={video}
        canvas={canvas}
        screenshot={screenshot}
      />
      <Preview screenshot={screenshot} canvas={canvas} />
    </div>
  );
}

export default App;
