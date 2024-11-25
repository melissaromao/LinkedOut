const Categoria = require('../models/Categoria');

module.exports = {
  create: async (req, res) => {
    const { nome, descricao } = req.body;

    try {
      const categoriaCreate = await Categoria.create({ nome, descricao });
      return res.render('categoria', { success: 'Categoria criada com sucesso', categoria: categoriaCreate });
    } catch (error) {
      console.error(error);
      return res.render('categoria', { error: 'Erro ao criar categoria' });
    }
  },

  findAll: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      return res.render('categorias', { categorias });
    } catch (error) {
      console.error(error);
      return res.render('categorias', { error: 'Erro ao listar categorias' });
    }
  },

  findOne: async (req, res) => {
    const { idCategoria } = req.params;

    try {
      const categoria = await Categoria.findByPk(idCategoria);
      if (!categoria) {
        return res.render('categoria', { warning: 'Categoria não encontrada' });
      }
      return res.render('categoriaDetalhes', { categoria });
    } catch (error) {
      console.error(error);
      return res.render('categoria', { error: 'Erro ao buscar categoria' });
    }
  },

  update: async (req, res) => {
    const { idCategoria } = req.params;
    const { nome, descricao } = req.body;

    try {
        const categoria = await Categoria.findByPk(idCategoria);

        if (!categoria) {
            return res.render('categorias', {
                warning: 'Categoria não encontrada',
                categorias: await Categoria.findAll(),
            });
        }

        categoria.nome = nome || categoria.nome;
        categoria.descricao = descricao || categoria.descricao;

        await categoria.save();

        return res.render('categorias', { success: 'Categoria atualizada com sucesso', categorias: await Categoria.findAll() });
    } catch (error) {
        console.error(error);
        return res.render('categorias', {
            error: 'Erro ao atualizar categoria',
            categorias: await Categoria.findAll(),
        });
    }
},

  delete: async (req, res) => {
    const { idCategoria } = req.params;
    const categorias = await Categoria.findAll();

    try {
      const categoria = await Categoria.findByPk(idCategoria);
      if (!categoria) {
        return res.render('categorias', { warning: 'Categoria não encontrada', categorias });
      }

      await categoria.destroy();
      return res.render('categorias', { success: 'Categoria excluída com sucesso', categorias });
    } catch (error) {
      console.error(error);
      return res.render('categorias', { error: 'Erro ao excluir categoria', categorias });
    }
  }
};