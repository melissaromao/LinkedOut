const Categoria = require('../models/Categoria');

module.exports = {
    // Criar Categoria
    async create(req, res) {
        try {
          const { nome, descricao} = req.body;
            const categoriaCreate = await Categoria.create(req.body);
            res.status(201).json(categoriaCreate);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar categoria' });
        }
    },

    // Listar todas as Categorias
    async findAll(req, res) {
        try {
      
            const categoriaFindAll = await Categoria.findAll();
            res.status(200).json(categoriaFindAll);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar categorias' });
        }
    },

    // Buscar Categoria por ID
    async findOne(req, res) {
        try {
          const { id } = req.params;
      const categoriaFindOne = await Categoria.findByPk(id);
      if (!categoriaFindOne) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }
      return res.status(200).json(categoriaFindOne);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar categoria.' });
    }
  },

    // Atualizar Categoria
    async update(req, res) {
      try {
          const { id } = req.params;
          const { nome, descricao } = req.body;

          const categoriaUpdate = await Categoria.findByPk(id);

          // Verificar se a categoria existe antes de atualizar
          if (!categoriaUpdate) {
              return res.status(404).json({ error: 'Categoria não encontrada' });
          }

          // Atualizar categoria
          await categoriaUpdate.update({ nome, descricao });

          // Retornar a categoria atualizada
          res.status(200).json(categoriaUpdate);
      } catch (error) {
          res.status(500).json({ error: 'Erro ao atualizar categoria' });
      }
  },

    // Excluir Categoria
    async delete(req, res) {
      try {
          const { id } = req.params;
          const categoriaDelete = await Categoria.findByPk(id);

          // Verificar se a categoria existe antes de excluir
          if (!categoriaDelete) {
              return res.status(404).json({ error: 'Categoria não encontrada' });
          }

          // Excluir categoria
          await categoriaDelete.destroy();
          res.status(204).send();
      } catch (error) {
          res.status(500).json({ error: 'Erro ao excluir categoria' });
      }
  }
};

