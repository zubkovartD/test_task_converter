import { Currency } from "../types/types";

export const validateInputValue = (
  initialValue: string | undefined,
  enteredValue: string | undefined
): boolean => {
  const tolerance = 0.1;

  if (initialValue === undefined || enteredValue === undefined) {
    return false;
  }

  const lowerBound =
    parseFloat(initialValue) - parseFloat(initialValue) * tolerance;
  const upperBound =
    parseFloat(initialValue) + parseFloat(initialValue) * tolerance;

  return (
    parseFloat(enteredValue) >= lowerBound &&
    parseFloat(enteredValue) <= upperBound
  );
};

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  currencies: Currency[]
) {
  const fromCurrencyRate: string | undefined = currencies.find(
    (currency: any) => currency.ccy === fromCurrency
  )?.buy;
  const toCurrencyRate: string | undefined = currencies.find(
    (currency: any) => currency.ccy === toCurrency
  )?.buy;

  if (fromCurrencyRate !== undefined && toCurrencyRate !== undefined) {
    const convertedAmount = (amount * +fromCurrencyRate) / +toCurrencyRate;
    return convertedAmount.toFixed(2);
  } else {
    throw new Error(
      `Cannot convert currency. Rates for ${fromCurrency} or ${toCurrency} not found.`
    );
  }
}
