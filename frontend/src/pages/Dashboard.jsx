import { useEffect, useState } from "react";
import CardsMetricas from "../components/CardsMetricas";
import Graficos from "../components/Graficos";

const BASE_URL = "http://localhost:8081";

export default function Dashboard() {

  const [produtos, setProdutos] = useState([]);
  const [faturamento, setFaturamento] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/produtos`)
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/vendas/faturamento`)
      .then(res => res.json())
      .then(data => setFaturamento(data.faturamento));
  }, []);

  return (
    <div>
     

      <CardsMetricas 
        produtos={produtos}
        faturamento={faturamento}
      />

      <Graficos produtos={produtos} />

    </div>
  );
}