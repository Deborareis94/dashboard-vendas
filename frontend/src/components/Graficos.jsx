import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Graficos({ produtos = [] }) {

  const chartRef = useRef(null);

  useEffect(() => {

    const ctx = chartRef.current;

    const labels = produtos.map(p => p.nome);
    const dados = produtos.map(p => p.estoque);

    const cores= produtos.map(p=>
      p.estoque <5 ? "#ef4444" : "#3b82f6"
    );

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Estoque por produto",
            data: dados,
            backgroundColor: cores
          }
        ]
      },
      options: {
        responsive: true
      }
    });

    return () => chart.destroy();

  }, [produtos]);

 return (
    <div className="bg-gray-800 p-6 rounded-xl mb-8">
      

      <canvas ref={chartRef}></canvas>

    </div>
  );
}