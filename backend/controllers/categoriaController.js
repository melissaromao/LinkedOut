const Categoria = require('../models/Categoria');

module.exports = {
    // Criar Categoria
    async create(req, res) {
        try {
            const categoria = await Categoria.create(req.body);
            res.status(201).json(categoria);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar categoria' });
        }
    },

    // Listar todas as Categorias
    async findAll(req, res) {
        try {
            const categorias = await Categoria.findAll();
            res.status(200).json(categorias);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar categorias' });
        }
    },

    // Buscar Categoria por ID
    async findOne(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (categoria) {
                res.status(200).json(categoria);
            } else {
                res.status(404).json({ error: 'Categoria não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar categoria' });
        }
    },

    // Atualizar Categoria
    async update(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (categoria) {
                await categoria.update(req.body);
                res.status(200).json(categoria);
            } else {
                res.status(404).json({ error: 'Categoria não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar categoria' });
        }
    },

    // Excluir Categoria
    async delete(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (categoria) {
                await categoria.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Categoria não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir categoria' });
        }
    }
};
