const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const properties = [
  { id: 1, nome: 'Apto Faria Lima', valorTotal: 1000000, tokensDisponiveis: 1000000 }
];

// Retorna a lista de imóveis
app.get('/properties', (req, res) => {
  res.json(properties);
});

// Compra tokens de um imóvel
app.post('/buy-tokens', (req, res) => {
  const { propertyId, quantidade } = req.body;
  const prop = properties.find(p => p.id === propertyId);
  if (!prop || quantidade > prop.tokensDisponiveis) {
    return res.status(400).json({ erro: 'Compra inválida' });
  }
  prop.tokensDisponiveis -= quantidade;
  res.json({ sucesso: true, restante: prop.tokensDisponiveis });
});

app.listen(3001, () => console.log('Backend on 3001'));