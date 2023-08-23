import { useContext, createContext, useState } from "react";
import { IsMobile } from "../utils/utils";
import { useToast } from "../components/ui/use-toast";

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

  SendConfirmation(index: number): void;
  FetchCards(base64: string): Promise<void>;

  GetLoading(): boolean;
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

  const FetchCards = async (base64: string): Promise<void> => {
    setLoading(true);

    const url = "https://magic-scanner-6f584b30ac80.herokuapp.com/scanner";

    try {
      const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          image: base64,
        }),
        mode: "no-cors",
      });

      const data = await request.json();
      setData(data);
      toast({ description: "Succefully scanned" });
    } catch (err) {
      toast({
        description: "Error during scann \n" + err,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const SendConfirmation = async (index: number) => {
    const url = "https://magic-scanner-6f584b30ac80.herokuapp.com/add";

    const confirmation: Confirmation = {
      id: data!.id,
      index: index,
    };

    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(confirmation),
        mode: "no-cors",
      });
      toast({ description: "Succefully added" });
    } catch (err) {
      toast({
        description: "Error during add " + err,
        variant: "destructive",
      });
    } finally {
      setData(undefined);
    }
  };

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
