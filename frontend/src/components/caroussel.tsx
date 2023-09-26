import { FC, useEffect, useState } from "react";
import { useCard, type Price } from "../context/Cards";
import { Button } from "./ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

type props = {
  setFlashing: React.Dispatch<React.SetStateAction<boolean>>;
};

const Carousel: FC<props> = ({ setFlashing }) => {
  const { GetImages, GetPrices, SendConfirmation, Clear, isLoading } =
    useCard();
  const [images, setImages] = useState<string[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [index, setIndex] = useState<number>(0);

  const handleNext = () => {
    setIndex((index + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const sendImage = (event: React.MouseEvent<HTMLImageElement>) => {
    if (event.detail == 2) {
      SendConfirmation(index)
        .then(() => setFlashing(true))
        .catch(() => setFlashing(false));
    }
  };

  const displayPrices = () => {
    if (prices.length == 0) return "";

    if (prices[index].eur !== "") return prices[index].eur + " €";
    if (prices[index].eur_foil !== "")
      return prices[index].eur_foil + " € (foil)";
    if (prices[index].usd !== "") return prices[index].usd + " $";
    if (prices[index].usd_foil !== "")
      return prices[index].usd_foil + " $ (foil)";

    return "Price not found";
  };

  useEffect(() => {
    setImages(GetImages());
    setPrices(GetPrices());
  }, [GetImages, GetPrices]);

  return (
    <div
      className={`${
        isLoading() ? "animate-pulse" : ""
      } flex flex-col items-center gap-3`}
    >
      <div className="relative">
        <img
          src={images[index]}
          alt="carousel"
          className="rounded-lg"
          onClick={sendImage}
        />
        <Button
          onClick={handlePrev}
          className="h-full absolute left-0 top-0 bg-transparent hover:bg-transparent"
        >
          <ChevronLeftIcon className="h-8 w-8 font-bold text-black" />
        </Button>
        <Button
          onClick={handleNext}
          className="h-full absolute right-0 top-0 bg-transparent hover:bg-transparent"
        >
          <ChevronRightIcon className="h-8 w-8 font-bold text-black" />
        </Button>
        <div className="absolute flex w-full items-center justify-center gap-3 left-0 right-0 bottom-1">
          <p>
            {index + 1}/{images.length}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-5 w-full items-center justify-center">
        <span className="text-lg font-bold">{displayPrices()}</span>
      </div>
      <Button
        variant={"destructive"}
        onClick={() => {
          setFlashing(true);
          Clear();
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default Carousel;
