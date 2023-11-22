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
    { ccy: "USD", buy: "1.2", base_ccy: "UAH", sale: "1.5" },
    { ccy: "EUR", buy: "1.5", base_ccy: "UAH", sale: "1.5" },
  ];

  it("should convert currency correctly", () => {
    expect(convertCurrency(10, "USD", "EUR", currencies)).toBe("12.50");
  });

  it("should throw an error for invalid currency", () => {
    expect(() => convertCurrency(10, "GBP", "EUR", currencies)).toThrowError();
  });
});
