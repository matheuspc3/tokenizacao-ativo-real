import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [compra, setCompra] = useState({ id: null, quantidade: 1 });

  useEffect(() => {
    axios.get("http://localhost:3001/properties").then((res) => setImoveis(res.data));
  }, []);

  const comprarTokens = (id) => {
    axios
      .post("http://localhost:3001/buy-tokens", { propertyId: id, quantidade: Number(compra.quantidade) })
      .then((res) => alert(`Compra realizada, tokens restantes: ${res.data.restante}`))
      .catch(() => alert("Erro na compra"));
  };

  return (
    <div>
      <h2>Imóveis disponíveis</h2>
      {imoveis.map((item) => (
        <div key={item.id}>
          <strong>{item.nome}</strong> - Valor: R$ {item.valorTotal} <br />
          Tokens disponíveis: {item.tokensDisponiveis} <br />
          <input
            type="number"
            min={1}
            value={compra.quantidade}
            onChange={(e) => setCompra({ id: item.id, quantidade: e.target.value })}
          />
          <button onClick={() => comprarTokens(item.id)}>Comprar tokens</button>
          <hr />
        </div>
      ))}
    </div>
  );
}