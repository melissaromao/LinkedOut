'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categoria', [
      { 
        nome: 'Desenvolvimento Web', 
        descricao: 'Categoria relacionada ao desenvolvimento de sites, aplicações web, e-commerce, etc.',
        
      },
      { 
        nome: 'Design', 
        descricao: 'Categoria que envolve design gráfico, identidade visual, e criação de layouts.',
      },
      { 
        nome: 'Marketing Digital', 
        descricao: 'Categoria focada em estratégias de marketing online, SEO, mídia paga e redes sociais.',
      
      },
      { 
        nome: 'Redação', 
        descricao: 'Categoria para profissionais que escrevem conteúdo para blogs, sites e redes sociais.',
       
      },
      { 
        nome: 'Consultoria', 
        descricao: 'Categoria de profissionais que prestam consultoria em diversas áreas de negócios.',
       
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categoria', null, {});
  
  }
};
