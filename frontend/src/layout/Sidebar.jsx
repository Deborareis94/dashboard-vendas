import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-xl font-bold tracking-wide mb-8 whitespace-nowrap">
        GESTOR DE VENDAS
      </h1>

      
   
      <nav className="flex flex-col gap-4">

        <Link
          to="/"
          className="uppercase text-sm font-semibold text-gray-300 hover:text-blue-400 transition"
        >
          PAINEL 
        </Link>

        <Link
          to="/produtos"
          className="uppercase text-sm font-semibold text-gray-300 hover:text-blue-400 transition"
        >
          PRODUTOS
        </Link>

        <Link
          to="/vendas"
          className="uppercase text-sm font-semibold text-gray-300 hover:text-blue-400 transition"
        >
          VENDAS
        </Link>

       
      </nav>
      </div>

  
  );
}