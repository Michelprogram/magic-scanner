import { useRef, useEffect, useState } from "react";
import Video from "./components/video";
import { useCard } from "./context/Cards";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";

function App() {
  const video = useRef<HTMLVideoElement>(null);

  const [selected, setSelected] = useState(false);

  const [sw, setSwitch] = useState("EN");

  const { FetchCards, GetLoading } = useCard();

  const changeSwitch = () => {
    setSwitch(sw == "FR" ? "EN" : "FR");
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

    FetchCards(formated);
  };

  useEffect(() => {
    setSelected(GetLoading);
  }, [GetLoading]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex w-3/4 m-auto gap-6 flex-col items-center pt-10">
        <h1 className="text-3xl font-bold text-center">
          Magic the gathering scanner
        </h1>
        <div className="h-fit">
          <Video video={video} />
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-2">
            <Switch id="language-mode" onClick={changeSwitch} />
            <Label htmlFor="language-mode">{sw}</Label>
          </div>
          <Button onClick={screenshot} disabled={selected}>
            Flash the card
          </Button>
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
