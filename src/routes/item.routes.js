// src/routes/item.routes.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// ROTA DE CADASTRO DE ITEM
router.post('/item', async (req, res) => {
  const { nome_objeto, dataEvento, localizacao, status, categoria_ID, usuario_ID } = req.body;

  if (!nome_objeto || !dataEvento || !localizacao || status === undefined || !categoria_ID) {
    return res.status(400).json({ message: 'Campos obrigatórios.' });
  }

  try {
    const novoItem = await prisma.item.create({
      data: {
        nome_objeto,
        dataEvento: new Date(dataEvento),
        localizacao,
        status,
        codigoAcesso: Math.random().toString(36).substring(2, 8),
        categoria_ID,
        usuario_ID: usuario_ID || null
      },
    });

    res.status(201).json({ message: 'Item cadastrado com sucesso!', id: novoItem.item_ID });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar item', detalhes: error.message });
  }
});

// ROTA DE LISTAGEM DE ITENS
router.get('/itens', async (req, res) => {
  try {
    const itens = await prisma.item.findMany({
      include: {
        categoria: true,
        usuario: true
      }
    });
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar itens', detalhes: error.message });
  }
});

module.exports = router;
