// Listar categorias
function fetchCategories() {
  fetch('http://localhost:8080/categoria/categoriasFindAll') // Certifique-se de usar a URL correta
      .then(response => response.json())
      .then(data => {
          const categoriaList = document.getElementById('categoria-list');
          categoriaList.innerHTML = '';
          data.forEach(categoria => {
              const li = document.createElement('li');
              li.textContent = categoria.nome; // Supondo que o nome da categoria seja "nome"
              categoriaList.appendChild(li);
          });
      })
      .catch(error => console.error('Erro ao buscar categorias:', error));
}

// Criar categoria
function createCategoria(nome, descricao) {
  fetch('http://localhost:8080/categoria/categoriaCreate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, descricao }), // Enviar o nome da categoria
  })
      .then(response => response.json())
      .then(data => {
          console.log('Categoria criada:', data);
          fetchCategories(); // Atualizar a lista
      })
      .catch(error => console.error('Erro ao criar categoria:', error));
}

// Atualizar uma categoria
function updateCategoria(id, newNome) {
  fetch(`http://localhost:8080/categoria/categoriaUpdate/${id}`, { // Corrigido o endpoint
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: newNome }), // Novo nome da categoria
  })
      .then(response => response.json())
      .then(data => {
          console.log('Categoria atualizada:', data);
          fetchCategories(); // Atualizar a lista
      })
      .catch(error => console.error('Erro ao atualizar categoria:', error));
}

// Deletar uma categoria
function deleteCategoria(id) {
  fetch(`http://localhost:8080/categoria/categoriaDelete/${id}`, { // Corrigido o endpoint
      method: 'DELETE',
  })
      .then(response => response.json())
      .then(data => {
          console.log('Categoria deletada:', data);
          fetchCategories(); // Atualizar a lista
      })
      .catch(error => console.error('Erro ao deletar categoria:', error));
}
