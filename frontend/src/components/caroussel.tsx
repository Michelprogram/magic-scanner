import { FC, useEffect, useState } from "react";
import { useCard } from "../context/Cards";
import { Button } from "./ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

interface Props {
  className: string;
}

const Carousel: FC<Props> = ({ className }) => {
  const { GetImages, SendConfirmation } = useCard();
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);

  const handleNext = () => {
    setIndex((index + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const cssSpan = (selected: number) => {
    return selected == index ? "bg-slate-500" : "bg-white";
  };

  const sendImage = (event: React.MouseEvent<HTMLImageElement>) => {
    if (event.detail == 2) {
      SendConfirmation(index);
    }
  };

  useEffect(() => {
    setImages(GetImages());
  }, [GetImages]);

  return (
    <div className={"relative" + className}>
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
          {images.map((_, index) => (
            <span
              key={index}
              className={
                "rounded-full w-2 h-2 block transition-bg ease-in-out duration-500 " +
                cssSpan(index)
              }
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
