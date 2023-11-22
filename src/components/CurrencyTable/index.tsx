import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Currency } from "../../types/types";
import useCurrenciesStore from "../../store/store";
import useSWR from "swr";
import apiMockData from "../../mockData/apiMockData.json";
import { API_LINK } from "../../api";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import EditableCell from "../EditableCell";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useLocalStorage from "../../hooks/useLocalStorage";

const CurrencyTable = () => {
  const [fetchCounter, setFetchCounter] = useLocalStorage("counter", 1);

  async function fetcher(link: string): Promise<Currency[]> {
    if (fetchCounter < 5) {
      setFetchCounter(fetchCounter + 1);
    } else {
      setFetchCounter(1);
      throw new Error("Counter is five");
    }

    try {
      const response = await fetch(link, { mode: "no-cors" });
      const data: Currency[] = await response.json();
      return data;
    } catch (error) {
      return new Promise((resolve) => {
        resolve(apiMockData);
      });
    }
  }
  const { currencies, setCurrencies } = useCurrenciesStore((state) => state);
  const { error: currenciesError } = useSWR<Currency[]>(API_LINK, fetcher, {
    onSuccess: (data) => setCurrencies(data),
  });
  return (
    <Container data-testid="table-component">
      {currenciesError ? (
        <Typography variant="h3" align="center" color="error">
          Error! Please reload the page
        </Typography>
      ) : (
        <TableContainer>
          <Table style={{ width: "50vw", margin: "0 auto" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "50px" }}>Currency</TableCell>
                <TableCell style={{ width: "50px" }}>Buy</TableCell>
                <TableCell style={{ width: "50px" }}>Sell</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currencies &&
                currencies.map((el) => (
                  <TableRow key={el.ccy}>
                    <TableCell component="th" scope="row">
                      {el.ccy}/{el.base_ccy}
                    </TableCell>
                    <EditableCell value={el.buy} ccy={el.ccy} field="buy" />
                    <EditableCell value={el.sale} ccy={el.ccy} field="sale" />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CurrencyTable;
