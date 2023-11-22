import CurrencyTable from "./components/CurrencyTable";
import Converter from "./components/Converter";
import Layout from "./components/wrappers/ContentWrapper";

function App() {
  return (
    <Layout>
      <CurrencyTable />
      <Converter />
    </Layout>
  );
}

export default App;
