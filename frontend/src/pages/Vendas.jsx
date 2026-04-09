import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8081";

export default function Vendas() {

  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const [dataFiltro, setDataFiltro] = useState("");

  useEffect(() => {

    fetch(`${BASE_URL}/produtos`)
      .then(res => res.json())
      .then(data => setProdutos(data));

    fetch(`${BASE_URL}/vendas`)
      .then(res => res.json())
      .then(data => setVendas(data));

  }, []);


  function registrarVenda(e){
    e.preventDefault();

    const produto = produtos.find(p => p.id == produtoSelecionado);
    if(!produto) return;

    const qtd = Number(quantidade);

    if(qtd > produto.estoque){
      alert("Estoque insuficiente");
      return;
    }

    const hoje = new Date();
    const dataFormatada =
      hoje.getFullYear() +
      "-" +
      String(hoje.getMonth() + 1).padStart(2,"0") +
      "-" +
      String(hoje.getDate()).padStart(2,"0");

    const novaVenda = {
      produtoId: produto.id,
      produtoNome: produto.nome,
      quantidade: qtd,
      valor: produto.preco * qtd,
      data: dataFormatada
    };

    fetch(`${BASE_URL}/vendas`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(novaVenda)
    })
    .then(res => res.json())
    .then(venda => {

      
      setVendas(prev => [...prev, venda]);

      const novoEstoque = produto.estoque - qtd;

      fetch(`${BASE_URL}/produtos/${produto.id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          ...produto,
          estoque: novoEstoque
        })
      });

    });

    setQuantidade("");
  }


 
  const vendasFiltradas = dataFiltro
    ? vendas.filter(v => {

        const dataVenda = new Date(v.data)
          .toISOString()
          .split("T")[0];

        return dataVenda === dataFiltro;

      })
    : vendas;


  const faturamento = vendasFiltradas.reduce((total, venda) => {
    return total + Number(venda.valor);
  },0);



  return (

    <div className="space-y-6">

     

     

      <form
        onSubmit={registrarVenda}
        className="bg-gray-800 p-4 rounded-lg flex gap-3"
      >

        <select
          value={produtoSelecionado}
          onChange={(e)=>setProdutoSelecionado(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        >

          <option value="">
            Selecionar produto
          </option>

          {produtos.map(p => (

            <option key={p.id} value={p.id}>
              {p.nome}
            </option>

          ))}

        </select>


        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e)=>setQuantidade(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        />


        <button
          type="submit"
          className="bg-green-600 px-4 py-2 rounded"
        >
          Registrar venda
        </button>

      </form>



     

      <div className="flex justify-between items-center">

        <input
          type="date"
          value={dataFiltro}
          onChange={(e)=>setDataFiltro(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        />

        <h3 className="text-lg font-semibold">

          {dataFiltro ? "Faturamento do dia" : "Faturamento total"}:

          {" "}R$ {faturamento.toFixed(2)}

        </h3>

      </div>



      {/* TABELA */}

      <div className="bg-gray-800 rounded-xl shadow overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-700 text-gray-300">

            <tr>
              <th className="p-4">Produto</th>
              <th className="p-4">Quantidade</th>
              <th className="p-4">Valor</th>
              <th className="p-4">Data</th>
            </tr>

          </thead>

          <tbody>

            {vendasFiltradas.map(v => (

              <tr
                key={v.id}
                className="border-t border-gray-700"
              >

                <td className="p-4">
                  {v.produtoNome}
                </td>

                <td className="p-4">
                  {v.quantidade}
                </td>

                <td className="p-4">
                  R$ {Number(v.valor).toFixed(2)}
                </td>

                <td className="p-4">
                  {new Date(v.data).toLocaleDateString("pt-BR")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}