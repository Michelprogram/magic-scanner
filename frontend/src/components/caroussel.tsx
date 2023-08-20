import { FC, useEffect, useState } from "react";
import { useCard } from "../context/Cards";

interface Props {
  className: string;
}

const Carousel: FC<Props> = ({ className }) => {
  const { GetImages, GetSelected, SetSelected } = useCard();
  const [images, setImages] = useState<string[]>([]);

  const handleNext = () => {
    SetSelected((GetSelected() + 1) % images.length);
  };

  const handlePrev = () => {
    SetSelected(GetSelected() === 0 ? images.length - 1 : GetSelected() - 1);
  };

  useEffect(() => {
    setImages(GetImages());
  }, [GetImages]);

  return (
    <div className={"relative" + className}>
      <div className="carousel__image">
        <img
          src={images[GetSelected()]}
          alt="carousel"
          className="rounded-lg"
        />
      </div>
      <div className="carousel__buttons">
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className="absolute flex">
        {images.map((_, index) => (
          <span
            key={index}
            className=" bg-black rounded-full w-5 h-5 block"
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
