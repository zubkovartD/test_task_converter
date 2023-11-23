// utils.test.js
import { validateInputValue, convertCurrency } from "../utils";

describe("validateInputValue", () => {
  it("should return true for valid input values", () => {
    expect(validateInputValue("10", "10.05")).toBe(true);
  });

  it("should return false for invalid input values", () => {
    expect(validateInputValue("10", "12")).toBe(false);
  });

  it("should return true when either initialValue or enteredValue is undefined", () => {
    const result = validateInputValue(undefined, "someValue");
    expect(result).toBe(false);
  });

  it("should return false when both initialValue and enteredValue are defined", () => {
    const result = validateInputValue("initialValue", "enteredValue");
    expect(result).toBe(false);
  });
});

describe("convertCurrency", () => {
  const currencies = [
    { ccy: "CHF", buy: "40", base_ccy: "UAH", sale: "40." },
    { ccy: "CZK", buy: "1.5", base_ccy: "UAH", sale: "1.5" },
  ];

  it("should convert currency correctly", () => {
    const convertedAmount = convertCurrency(4, "CHF", "CZK", currencies);
    expect(convertedAmount).toBe("106.67");
  });

  it("should throw an error for invalid 'fromCurrency'", () => {
    expect(() => convertCurrency(10, "GBP", "EUR", currencies)).toThrowError(
      "Cannot convert currency. Rates for GBP or EUR not found."
    );
  });

  it("should throw an error for invalid 'toCurrency'", () => {
    expect(() => convertCurrency(10, "USD", "GBP", currencies)).toThrowError(
      "Cannot convert currency. Rates for USD or GBP not found."
    );
  });

  it("should throw an error for both invalid currencies", () => {
    expect(() => convertCurrency(10, "GBP", "JPY", currencies)).toThrowError(
      "Cannot convert currency. Rates for GBP or JPY not found."
    );
  });
});
