const Categoria = require('../models/Categoria');  // Modelo de categoria

// Criar categoria
module.exports = {
  create: async (req, res) => {
    try {
      const { nome } = req.body;
      const categoria = await Categoria.create({ nome });
      return res.status(201).json(categoria);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar categoria.' });
    }
  },

  // Listar todas as categorias
  findAll: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao listar categorias.' });
    }
  },

  // Buscar categoria por ID
  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }
      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar categoria.' });
    }
  },

  // Atualizar categoria
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const categoria = await Categoria.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }

      categoria.nome = nome || categoria.nome;
      await categoria.save();

      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar categoria.' });
    }
  },

  // Excluir categoria
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }

      await categoria.destroy();

      return res.status(200).json({ message: 'Categoria excluída com sucesso.' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao excluir categoria.' });
    }
  }
};
