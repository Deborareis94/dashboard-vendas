import React from "react";

function CardsMetricas({ produtos }) {

  
  if (!Array.isArray(produtos)) {
    produtos = [];
  }

  const totalProdutos = produtos.length;

  const valorEstoque = produtos.reduce((total, p) => {
    return total + (Number(p.preco) * Number(p.estoque));
  }, 0);

  const estoqueBaixo = produtos.filter(p => Number(p.estoque) < 5).length;

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">

      <div className="bg-gray-800 p-3 rounded-xl shadow-lg">
        <h3 className="text-gray-400 text-sm mb-2">
          Total de Produtos
        </h3>
        <p className="text-4xl font-bold text-white">
          {totalProdutos}
        </p>
      </div>

      <div className="bg-gray-800 p-3 rounded-xl shadow-lg">
        <h3 className="text-gray-400 text-sm mb-2">
          Valor do Estoque
        </h3>
        <p className="text-4xl font-bold text-green-400">
          R$ {valorEstoque.toFixed(2)}
        </p>
      </div>

      <div className="bg-gray-800 p-3 rounded-xl shadow-lg">
        <h3 className="text-gray-400 text-sm mb-2">
          Estoque Baixo
        </h3>
        <p className="text-4xl font-bold text-red-400">
          {estoqueBaixo}
        </p>
      </div>

    </div>
  );
}

export default CardsMetricas;









    