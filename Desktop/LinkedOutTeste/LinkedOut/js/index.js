// Exemplo de JavaScript para lidar com os formulários
$(document).ready(function() {
    $('#sign-in').submit(function(e) {
        e.preventDefault(); // Evita o envio do formulário
       alert ('Seja bem-vindo ao Linked Out!!!');
       window.location.href = 'homeFreelancers.html'
    });

});