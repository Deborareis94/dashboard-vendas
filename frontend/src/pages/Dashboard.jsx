import { useEffect, useState } from "react";
import CardsMetricas from "../components/CardsMetricas";
import Graficos from "../components/Graficos";



export default function Dashboard() {

  const [produtos, setProdutos] = useState([]);
  const [faturamento, setFaturamento] = useState(0);

  useEffect(() => {
    fetch(`/api/produtos`)
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  useEffect(() => {
    fetch(`/vendas/faturamento`)
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