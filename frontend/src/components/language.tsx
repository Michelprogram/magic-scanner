import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { FC } from "react";

type props = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const Language: FC<props> = ({ language, setLanguage }) => {
  const changeSwitch = () => {
    setLanguage(language == "FR" ? "EN" : "FR");
  };

  return (
    <div className="flex items-center gap-2">
      <Switch id="language-mode" onClick={changeSwitch} />
      <Label htmlFor="language-mode">{language}</Label>
    </div>
  );
};

export default Language;
