const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // Você pode mudar a porta se quiser

// Serve arquivos estáticos da pasta "public"
// Todos os seus arquivos frontend (HTML, CSS, JS) devem estar aqui
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial (index.html)
// O Express precisa saber qual arquivo HTML servir para a raiz '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para obter os posts do posts.json
app.get('/posts', (req, res) => {
    // Carrega o arquivo posts.json (que está na raiz do projeto)
    const posts = require('./posts.json');
    res.json(posts); // Envia os posts como JSON
});

// Rota para um post individual (ex: /post/1)
app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const posts = require('./posts.json'); // Carrega posts.json
    const post = posts.find(p => p.id === postId);

    if (post) {
        // Renderiza uma página de post individual com o novo design
        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${post.titulo}</title>
                <link rel="stylesheet" href="/style.css"> </head>
            <body>
                <header>
                    <h1>${post.titulo}</h1>
                    <nav><a href="/">Voltar para a página inicial</a></nav>
                </header>

                <main>
                    <div class="video-container-responsive"> <iframe
                            src="https://www.youtube.com/embed/${post.youtubeId}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="post-content"> <h1>${post.titulo}</h1>
                        <p>${post.descricao}</p>
                        <small>Publicado em: ${post.dataPublicacao}</small>
                    </div>
                </main>

                <footer>
                    <p>&copy; 2025 Meu Blog. Todos os direitos reservados.</p>
                </footer>
            </body>
            </html>
        `);
    } else {
        res.status(404).send('Post não encontrado!');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
