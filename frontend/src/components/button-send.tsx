import { FC } from "react";
import { useCard } from "../context/Cards";

interface props {
  screenshot: React.RefObject<HTMLImageElement>;
  text: string;
}

const Button: FC<props> = ({ text }) => {
  const { SendConfirmation } = useCard();

  return (
    <div>
      <button
        type="button"
        onClick={() => SendConfirmation()}
        className=" w-52 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
