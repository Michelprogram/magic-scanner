import { useRef } from "react";
import Video from "./components/video";
import Button from "./components/button";
import Preview from "./components/preview";
import Send from "./components/button-send";
import { CardProvider } from "./context/Cards";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const screenshot = useRef<HTMLImageElement>(null);

  const video = useRef<HTMLVideoElement>(null);

  return (
    <CardProvider>
      <div className=" flex w-3/4 m-auto gap-6 flex-col items-center pt-10">
        <h1 className="text-3xl font-bold text-center">
          Magic the gathering scanner
        </h1>
        <div className=" h-fit">
          <Video video={video} />
        </div>
        <div className=" flex flex-col">
          <Button
            text="Flashing the card"
            video={video}
            canvas={canvas}
            screenshot={screenshot}
          />
          <Send text="Confirme" screenshot={screenshot} />
        </div>

        <Preview screenshot={screenshot} canvas={canvas} />
      </div>
    </CardProvider>
  );
}

export default App;
