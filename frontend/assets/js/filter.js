document.getElementById('filter-category').addEventListener('change', function() {
  const idCategoria = this.value;
  const url = idCategoria ? `/freelas?page=1&categoriaId=${idCategoria}` : '/freelas?page=1';

  fetch(url)
      .then(response => response.text()) 
      .then(html => {
          document.getElementById('freelas-container').innerHTML = html; 
      })
      .catch(error => {
          console.error('Erro ao aplicar o filtro de categoria:', error);
      });
});
