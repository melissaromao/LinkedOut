const Categoria = require('../models/Categoria');  // Modelo de categoria

module.exports = {

  // Criar categoria
  create: async (req, res) => {
    try {
      const { nome, descricao } = req.body;
      const categoriaCreate = await Categoria.create({ nome, descricao });
      return res.status(201).json(categoriaCreate);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar categoria.' });
    }
  },

  // Listar todas as categorias
  findAll: async (req, res) => {
    try {
      const categoriaFindAll = await Categoria.findAll();
      return res.status(200).json(categoriaFindAll);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao listar categorias.' });
    }
  },

  // Buscar categoria por ID
  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const categoriaFindone = await Categoria.findByPk(id);
      if (!categoriaFindone) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }
      return res.status(200).json(categoriaFindone);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar categoria.' });
    }
  },

  // Atualizar categoria
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const {descricao} = req.body;
      const categoriaUpdate = await Categoria.findByPk(id);

      if (!categoriaUpdate) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }

      categoriaUpdate.nome = nome || categoriaUpdate.nome;
      await categoriaUpdate.save();
      categoriaUpdate.descricao = descricao || categoriaUpdate.descricao;
      await categoriaUpdate.save();

      return res.status(200).json(categoriaUpdate);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar categoria.' });
    }
  },

  // Excluir categoria
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const categoriaDelete = await Categoria.findByPk(id);

      if (!categoriaDelete) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }

      await categoriaDelete.destroy();

      return res.status(200).json({ message: 'Categoria excluída com sucesso.' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao excluir categoria.' });
    }
  }
};
