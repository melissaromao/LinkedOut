'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categoria', [
      { 
        nome: 'Gestão de Projetos', 
        descricao: 'Categoria dedicada à gestão de projetos, coordenação de equipes e acompanhamento de cronogramas e orçamentos.',
       
      },
      { 
        nome: 'Desenvolvimento Mobile', 
        descricao: 'Categoria focada no desenvolvimento de aplicativos móveis para Android e iOS.',
       
      },
      { 
        nome: 'Tradução e Localização', 
        descricao: 'Categoria para profissionais especializados em tradução e adaptação de conteúdo para diferentes idiomas e culturas.',
      
      },
      { 
        nome: 'Suporte Técnico', 
        descricao: 'Categoria para especialistas em suporte técnico, manutenção de sistemas e resolução de problemas de TI.',
      
      },
      { 
        nome: 'Análise de Dados', 
        descricao: 'Categoria dedicada a profissionais que analisam dados para gerar insights e apoiar decisões empresariais.',
        
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categoria', null, {});
  }
};
