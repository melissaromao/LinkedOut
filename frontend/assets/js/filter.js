// Preenche o menu de categorias
function populateCategoriaFilter() {
  fetch('http://localhost:8080/categoria/categoriaFindAll') // Endpoint do backend para listar categorias
      .then(response => response.json())
      .then(data => {
          const filterSelect = document.getElementById('filter-categoria');
          data.forEach(categoria => {
              const option = document.createElement('option');
              option.value = categoria.idCategoria; // Usar o id da categoria
              option.textContent = categoria.nome; // Nome da categoria
              filterSelect.appendChild(option);
          });
      })
      .catch(error => console.error('Erro ao buscar categorias:', error));
}

// Busca vagas filtradas
function fetchFilteredCategoria() {
  // Pega os valores do filtro de categorias e da barra de pesquisa
  const idCategoria = document.getElementById('filter-categoria').value;
  const searchText = document.querySelector('input[type="search"]').value;

  // Monta a URL com os parâmetros
  let url = 'http://localhost:8080/freela';
  const params = [];
  if (idCategoria) params.push(`idCategoria=${idCategoria}`); // Corrigir o nome do parâmetro
  if (searchText) params.push(`search=${encodeURIComponent(searchText)}`);
  if (params.length > 0) url += `?${params.join('&')}`;

  // Faz a requisição ao backend
  fetch(url)
      .then(response => response.json())
      .then(data => {
          // Atualiza a lista de vagas no front
          const freelaList = document.getElementById('filtered-freela-list');
          freelaList.innerHTML = ''; // Limpa a lista antes de exibir

          if (data.length === 0) {
              freelaList.innerHTML = '<li>Nenhuma vaga encontrada</li>';
          } else {
              data.forEach(job => {
                  const li = document.createElement('li');
                  li.textContent = job.nome; // Ajuste para usar o nome da vaga, assumindo que o campo é "nome"
                  freelaList.appendChild(li);
              });
          }
      })
      .catch(error => console.error('Erro ao buscar vagas:', error));
}

// Configura o evento para o botão de pesquisa
document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  fetchFilteredCategoria();
});

// Inicializa o menu de categorias ao carregar a página
populateCategoriaFilter();
