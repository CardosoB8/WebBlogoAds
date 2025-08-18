document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');

    fetch('/posts') // Faz uma requisição GET para a rota /posts do seu servidor
        .then(response => response.json())
        .then(posts => {
            postsContainer.innerHTML = ''; // Limpa o "Carregando posts..."
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post-card'); // Para estilizar depois no CSS
                postElement.innerHTML = `
                    <h2><a href="/post/${post.id}">${post.titulo}</a></h2>
                    <div class="video-thumbnail">
                        <a href="/post/${post.id}">
                            <img src="https://img.youtube.com/vi/${post.youtubeId.replace('watch?v=', '')}/mqdefault.jpg" alt="${post.titulo}">
                        </a>
                    </div>
                    <p>${post.descricao}</p>
                    <small>Publicado em: ${post.dataPublicacao}</small>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os posts:', error);
            postsContainer.innerHTML = '<p>Ocorreu um erro ao carregar os posts. Por favor, tente novamente mais tarde.</p>';
        });
});