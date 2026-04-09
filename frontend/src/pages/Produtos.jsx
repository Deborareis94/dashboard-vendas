import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8081";

function Produtos() {

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  const [buscar, setBuscar] = useState("");

  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/produtos`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        return res.json();
      })
      .then(data => setProdutos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;

  function adicionarProduto(e) {
    e.preventDefault();

    fetch(`${BASE_URL}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, preco, estoque })
    })
    .then(() => {
  return fetch(`${BASE_URL}/produtos`);
})
.then(res => res.json())
.then(data => {
  setProdutos(data);
  setNome("");
  setPreco("");
  setEstoque("");
});
  }

  function deletarProduto(id) {
    fetch(`${BASE_URL}/produtos/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setProdutos(produtos.filter(p => p.id !== id));
    });
  }

  function editarProduto(id, novoNome, novoPreco, novoEstoque) {
    fetch(`${BASE_URL}/produtos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: novoNome,
        preco: novoPreco,
        estoque: novoEstoque
      })
    })
    .then(res => res.json())
    .then(produtoAtualizado => {
      setProdutos(produtos.map(p =>
        p.id === id ? produtoAtualizado : p
      ));
    });
  }

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().startsWith(buscar.toLowerCase())
  );

  return (

    <div className="mb-10">

      

      

      <form
        onSubmit={adicionarProduto}
        className="bg-gray-800 p-4 rounded-lg flex gap-3 mb-8"
      >

        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e)=> setNome(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e)=> setPreco(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Estoque"
          value={estoque}
          onChange={(e)=> setEstoque(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Adicionar
        </button>

      </form>

     

      <div className="relative w-64 mb-4">

        

      <input
        type="text"
        placeholder="Buscar produto..."
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        className="bg-gray-700 text-white p-2  rounded w-64 mb-4"
      />

      </div>

    

      <div className="bg-gray-800 rounded-xl shadow overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-700 text-gray-300">

            <tr>
              <th className="p-4">Produto</th>
              <th className="p-4">Preço</th>
              <th className="p-4">Estoque</th>
              <th className="p-4">Ações</th>
            </tr>

          </thead>

          <tbody>

            {produtosFiltrados.map(p => (

              <tr
                key={p.id}
                className="border-t border-gray-700 hover:bg-gray-700"
              >

                <td className="p-4 font-semibold">{p.nome}</td>

                <td className="p-4">R$ {p.preco}</td>

                <td className="p-4">{p.estoque}</td>

                <td className="p-4 flex gap-4">

                  <button
                    onClick={() => setProdutoEditando(p)}
                    className="text-yellow-400 hover:underline"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deletarProduto(p.id)}
                    className="text-red-400 hover:underline"
                  >
                    Deletar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      

      {produtoEditando && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-gray-800 p-6 rounded-lg w-96">

            <h3 className="text-lg font-bold mb-4">
              Editar produto
            </h3>

            <input
              type="text"
              value={produtoEditando.nome}
              onChange={(e)=> setProdutoEditando({
                ...produtoEditando,
                nome: e.target.value
              })}
              className="bg-gray-700 p-2 rounded w-full mb-3"
            />

            <input
              type="number"
              value={produtoEditando.preco}
              onChange={(e)=> setProdutoEditando({
                ...produtoEditando,
                preco: e.target.value
              })}
              className="bg-gray-700 p-2 rounded w-full mb-3"
            />

            <input
              type="number"
              value={produtoEditando.estoque}
              onChange={(e)=> setProdutoEditando({
                ...produtoEditando,
                estoque: e.target.value
              })}
              className="bg-gray-700 p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setProdutoEditando(null)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  editarProduto(
                    produtoEditando.id,
                    produtoEditando.nome,
                    produtoEditando.preco,
                    produtoEditando.estoque
                  );
                  setProdutoEditando(null);
                }}
                className="bg-blue-600 px-4 py-2 rounded"
              >
                Salvar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default Produtos;