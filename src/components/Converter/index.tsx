import { useState, useEffect } from "react";
import { Select, MenuItem, Button, Grid, TextField } from "@mui/material";
import useCurrenciesStore from "../../store/store";
import { convertCurrency } from "../../utils";

const Converter = () => {
  const { currencies } = useCurrenciesStore((state) => state);
  const optionCurrencies = currencies.map((el) => el.ccy);

  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");

  const [currentMode] = useState("input1");

  const [dropdown1, setDropdown1] = useState<string>(optionCurrencies[0] || "");
  const [dropdown2, setDropdown2] = useState<string>(optionCurrencies[1] || "");

  const isButtonDisabled = !(
    (input1 && dropdown1 && dropdown2) ||
    (input2 && dropdown2 && dropdown1)
  );

  const handleSwap = () => {
    const tempInput = input1;
    setInput1(input2);
    setInput2(tempInput);

    const tempDropdown = dropdown1;
    setDropdown1(dropdown2);
    setDropdown2(tempDropdown);
  };

  useEffect(() => {
    if (input1 && dropdown1 && dropdown2) {
      const convertedAmount: any = convertCurrency(
        parseFloat(input1),
        dropdown1,
        dropdown2,
        currencies
      );
      if (!isNaN(convertedAmount)) {
        if (currentMode === "input1" && input2 !== convertedAmount.toString()) {
          setInput2(convertedAmount.toString());
        }
      }
    } else if (input2 && dropdown2 && dropdown1) {
      const convertedAmount: any = convertCurrency(
        parseFloat(input2),
        dropdown2,
        dropdown1,
        currencies
      );
      if (!isNaN(convertedAmount)) {
        if (currentMode === "input2" && input1 !== convertedAmount.toString()) {
          setInput1(convertedAmount.toString());
        }
      }
    }
  }, [input1, dropdown1, dropdown2, currencies, input2, currentMode]);

  return (
    <div
      style={{
        width: "50vw",
        margin: "0 auto",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
      data-testid="converter"
    >
      <Grid container spacing={1}>
        <Grid item>
          <TextField
            label="Change"
            variant="outlined"
            value={input1}
            type="number"
            onChange={(e) => setInput1(e.target.value)}
          />
          <Select
            label="Select 1"
            variant="outlined"
            value={dropdown1}
            onChange={(e) => setDropdown1(e.target.value)}
          >
            {optionCurrencies.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSwap}
            disabled={isButtonDisabled}
          >
            &#8644;
          </Button>
        </Grid>
        <Grid item>
          <TextField
            label="Get"
            variant="outlined"
            type="number"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <Select
            label="Select 2"
            variant="outlined"
            value={dropdown2}
            onChange={(e) => setDropdown2(e.target.value)}
          >
            {optionCurrencies.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </div>
  );
};

export default Converter;
