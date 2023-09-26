import { useContext, createContext, useState } from "react";
import { useToast } from "../components/ui/use-toast";

type CardProviderProps = {
  children: React.ReactNode;
};

export type Price = {
  usd: string;
  usd_foil: string;
  eur: string;
  eur_foil: string;
};

type Card = {
  image_uris: {
    small: string;
    normal: string;
    png: string;
  };
  prices: Price;
};

type Confirmation = {
  id: string;
  index: number;
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
  GetPrices(): Price[];

  SendConfirmation(index: number): Promise<void>;
  FetchCards(base64: string, language: string): Promise<void>;

  isLoading(): boolean;
  SetLoading(loading: boolean): void;
};

const CardContext = createContext<CardContext>({} as CardContext);

export function useCard() {
  return useContext(CardContext);
}

export function CardProvider({ children }: CardProviderProps) {
  const [data, setData] = useState<Cards>();
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const Clear = () => {
    setData(undefined);
  };

  const FetchCards = async (
    base64: string,
    language: string
  ): Promise<void> => {
    setLoading(true);

    const url = "/v1/scanner";

    const request = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        image: base64,
        language: language,
      }),
      mode: "no-cors",
    });

    setLoading(false);
    const data = await request.json();

    if (!request.ok) {
      toast({
        description: "Error during scan : " + data.message,
        variant: "destructive",
        duration: 3000,
      });

      throw data.message;
    }

    setData(data);
    toast({ description: "Succefully scanned", duration: 1000 });
  };

  const SendConfirmation = async (index: number): Promise<void> => {
    setLoading(true);

    const url = "/v1/add";

    const confirmation: Confirmation = {
      id: data!.id,
      index: index,
    };

    const request = await fetch(url, {
      method: "POST",
      body: JSON.stringify(confirmation),
      mode: "no-cors",
    });

    const js = await request.json();

    setLoading(false);

    if (!request.ok) {
      toast({
        description: "Error during add " + js.message,
        variant: "destructive",
        duration: 3000,
      });

      throw js.message;
    }

    setData(undefined);
    toast({ description: "Succefully added", duration: 1000 });
  };

  const isLoading = () => {
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
    if (data == undefined || data.cards == undefined) return [];
    return data.cards.data.map((card) => card.image_uris.normal);
  };

  const GetPrices = () => {
    if (data == undefined || data.cards == undefined) return [];
    return data.cards.data.map((card) => card.prices);
  };

  return (
    <CardContext.Provider
      value={{
        GetPrices,
        SendConfirmation,
        GetImages,
        isLoading,
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
