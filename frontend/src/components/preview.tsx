import { FC } from "react";

interface props {
  canvas: React.RefObject<HTMLCanvasElement>;
  screenshot: React.RefObject<HTMLImageElement>;
}

const Preview: FC<props> = ({ canvas, screenshot }) => {
  return (
    <div>
      <canvas ref={canvas} className=" hidden"></canvas>
      <img ref={screenshot} alt="Preview" />
    </div>
  );
};

export default Preview;
