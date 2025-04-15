const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Rota para criar uma nova categoria manual
router.post('/categoria', async (req, res) => {
  const { nome } = req.body;

  try {
    const categoria = await prisma.categoria.create({
      data: { nome }
    });

    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar categoria', detalhes: error.message });
  }
});

// ✅ ROTA PARA POPULAR CATEGORIAS PADRÃO
router.post('/categoria/preencher', async (req, res) => {
  try {
    const categorias = [
      { nome: 'Chaves' },
      { nome: 'Carteiras' },
      { nome: 'Documentos' },
      { nome: 'Eletrônicos' }
    ];

    const criadas = await Promise.all(
      categorias.map(cat => prisma.categoria.create({ data: cat }))
    );

    res.status(201).json(criadas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao preencher categorias', detalhes: error.message });
  }
});

module.exports = router;
