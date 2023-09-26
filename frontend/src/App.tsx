import { useState } from "react";
import Video from "./components/video";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/ui/theme-provider";

import Carousel from "./components/caroussel";

function App() {
  const [flashing, setFlashing] = useState(true);

  const centralBehavior = () => {
    if (flashing) {
      return <Video setFlashing={setFlashing} />;
    }
    return <Carousel setFlashing={setFlashing} />;
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex w-3/4 m-auto gap-6 flex-col items-center pt-10">
        <h1 className="text-3xl font-bold text-center">Magic scanner</h1>
        <div className="h-fit">{centralBehavior()}</div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
