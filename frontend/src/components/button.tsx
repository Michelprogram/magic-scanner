import { FC } from "react";
import { useCard } from "../context/Cards";

interface props {
  video: React.RefObject<HTMLVideoElement>;
  canvas: React.RefObject<HTMLCanvasElement>;
  screenshot: React.RefObject<HTMLImageElement>;
  text: string;
}

const Button: FC<props> = ({ video, text, canvas, screenshot }) => {
  const CROP = 300;

  const { FetchCards, GetLoading } = useCard();

  const takeScreenshot = () => {
    if (canvas.current && video.current && screenshot.current) {
      const width = video.current.videoWidth;
      const height = video.current.videoHeight;

      canvas.current.width = width;
      canvas.current.height = height;
      canvas.current
        .getContext("2d")!
        .drawImage(video.current, 0, 0, width, CROP, 0, 0, width, CROP);

      const base64 = canvas.current.toDataURL("image/jpg");

      FetchCards(base64);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => takeScreenshot()}
        disabled={GetLoading()}
        className=" w-52 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
