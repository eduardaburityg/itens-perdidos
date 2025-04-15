const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

console.log('📦 usuario.routes.js carregado com sucesso!');

// ROTA DE REGISTRO
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Campos obrigatórios.' });
  }

  try {
    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha },
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso!', id: novoUsuario.usuario_ID });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', detalhes: error.message });
  }
});

// ROTA DE LOGIN
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha obrigatórios.' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    return res.status(200).json({
      message: 'Login bem-sucedido!',
      nome: usuario.nome,
      id: usuario.usuario_ID
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', detalhes: error.message });
  }
});

module.exports = router;
