// src/index.js
const express = require('express');
const cors = require('cors');

const itemRoutes = require('./routes/item.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ROTAS
app.use('/api', itemRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', usuarioRoutes);

console.log('🛠️ Rotas carregadas: /api/item, /api/categoria, /api/usuario');

app.get('/', (req, res) => {
  res.send('✅ API dos Itens Perdidos está online!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
