import { useContext, createContext, useState } from "react";
import { IsMobile } from "../utils/utils";

type CardProviderProps = {
  children: React.ReactNode;
};

type Card = {
  image_uris: {
    small: string;
    normal: string;
    png: string;
  };
};

export type Cards = {
  id: string;
  cards: {
    data: Array<Card>;
  };
};

type CardContext = {
  Clear(): void;
  GetCards(): Card[];
  GetImages(): string[];

  SendConfirmation(): void;
  FetchCards(base64: string): void;

  GetLoading(): boolean;
  SetLoading(loading: boolean): void;

  GetSelected(): number;
  SetSelected(index: number): void;
};

const CardContext = createContext<CardContext>({} as CardContext);

export function useCard() {
  return useContext(CardContext);
}

export function CardProvider({ children }: CardProviderProps) {
  const [data, setData] = useState<Cards>();
  const [selected, setSelected] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const Clear = () => {
    setData(undefined);
  };

  const FetchCards = async (base64: string) => {
    setLoading(true);

    const url = IsMobile()
      ? "http://192.168.1.17:3333/scanner"
      : "http://localhost:3333/scanner";

    const request = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        image: base64,
      }),
    });

    const data = await request.json();
    setData(data);

    setLoading(false);
  };

  const SendConfirmation = async () => {
    const url = IsMobile()
      ? "http://192.168.1.17:3333/add"
      : "http://localhost:3333/add";

    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id: data!.id,
        index: selected,
      }),
    });

    setData(undefined);
  };

  const GetSelected = () => {
    return selected;
  };

  const SetSelected = (index: number) => setSelected(index);

  const GetLoading = () => {
    return loading;
  };

  const SetLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const GetCards = () => {
    if (data == undefined) return [];
    return data.cards.data;
  };

  const GetImages = () => {
    if (data == undefined) return [];
    return data.cards.data.map((card) => card.image_uris.normal);
  };

  return (
    <CardContext.Provider
      value={{
        SendConfirmation,
        GetSelected,
        SetSelected,
        GetImages,
        GetLoading,
        SetLoading,
        Clear,
        GetCards,
        FetchCards,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
