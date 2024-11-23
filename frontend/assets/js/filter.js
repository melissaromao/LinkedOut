// Supondo que você tenha uma função para buscar as categorias
fetch('http://localhost:8080/api/categoria/categoriaFindAll')
  .then(response => response.json())
  .then(data => {
    console.log("Dados recebidos:", data);  // Confirme se os dados estão corretos

    // Selecionando o select pelo ID
    const selectElement = document.getElementById("filter-category");

    // Adicionando as opções dinamicamente
    data.forEach(categoria => {
      const option = document.createElement("option");
      option.value = categoria.id;  // Supondo que o campo id exista
      option.textContent = categoria.nome;  // E que o nome da categoria seja 'nome'
      selectElement.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Erro ao buscar categorias:', error);
  });
