const BASE_URL= "http://localhost:8081";

export const getProdutos = async() => {
   try {
     const response = await fetch(`${BASE_URL}/produtos`);
      if(!response.ok){
        throw new Error ("Erro ao buscar produtos");
    }
    const data =await response.json();
        return data;
} catch (error) {
     console.error(error);
     return [];
}
};

export const addProduto = async (produto) =>{
    try{
        const response =await fetch (`${BASE_URL}/produtos`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(produto),
   });
    if (!response.ok){
        throw new Error ("Erro ao adicionar produto");
    }
    const data = await response.json();
    return data;
} catch (error){
    console.error(error);
    return null;
}

};


