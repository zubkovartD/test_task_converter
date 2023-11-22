import { Currency } from "../types/types";
import { create } from "zustand";

interface CurrenciesState {
  currencies: Currency[];
  setCurrencies: (currencies: Currency[]) => void;
}

const useCurrenciesStore = create<CurrenciesState>((set) => ({
  currencies: [],
  setCurrencies: (currencies) => set(() => ({ currencies })),
}));

export default useCurrenciesStore;
