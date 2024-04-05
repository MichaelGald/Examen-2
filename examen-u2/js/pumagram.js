document.addEventListener("DOMContentLoaded", function() {
    const likesUsuario = document.querySelectorAll(".like-btn");
    const numeroDeLike = document.querySelector('.like-count');
    const comentarioInput = document.querySelector('.comment-input');
    const addComentarioBtn = document.querySelector('.add-comment-btn');
    const comentariosContainer = document.querySelector('.comments-container');
    const postImage = document.querySelector('.post-image');
    let numeroDeLikes = parseInt(localStorage.getItem('likeCount')) || 0;
    likesUsuario.forEach(like => {
        like.addEventListener("click", () => {
            let numeroDeLikes = parseInt(numeroDeLike.textContent);
            const likeApretado = like.textContent;

            if (likeApretado === "Me gusta") {
                numeroDeLikes++;
                numeroDeLike.textContent = numeroDeLikes;
                like.textContent = "No me gusta";
            } else {
                numeroDeLikes--;
                numeroDeLike.textContent = numeroDeLikes;
                like.textContent = "Me gusta";
            }
            numeroDeLike.textContent = numeroDeLikes;
            localStorage.setItem('likeCount', numeroDeLikes);
        });
    });

    postImage.addEventListener('dblclick', () => {
        let numeroDeLikes = parseInt(numeroDeLike.textContent);

        if (postImage.classList.contains('liked')) {
            numeroDeLikes--;
            postImage.classList.remove('liked');
        } else {
            numeroDeLikes++;
            postImage.classList.add('liked');
        }

        numeroDeLike.textContent = numeroDeLikes;
        localStorage.setItem('likeCount', numeroDeLikes);
    });

    addComentarioBtn.addEventListener('click', () => {
        const comentarioTexto = comentarioInput.value.trim();
        if (comentarioTexto !== '') {
            const nuevoComentario = document.createElement('div');
            nuevoComentario.classList.add('comment');
            nuevoComentario.innerHTML = `
                <span class="comment-username">usuario:</span>
                <span class="comment-text">${comentarioTexto}</span>
            `;
            comentariosContainer.appendChild(nuevoComentario);
            comentarioInput.value = '';

            guardarComentariosEnLocalStorage();
        }
    });//Creo que si funciona correctamente 

    cargarComentariosDesdeLocalStorage();

    function guardarComentariosEnLocalStorage() {
        const comentarios = document.querySelectorAll('.comment');
        const comentariosGuardados = [];
        comentarios.forEach(comentario => {
            comentariosGuardados.push(comentario.innerHTML);
        });
        localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));
    }

    function cargarComentariosDesdeLocalStorage() {
        const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios'));
        if (comentariosGuardados) {
            comentariosGuardados.forEach(comentario => {
                const nuevoComentario = document.createElement('div');
                nuevoComentario.classList.add('comment');
                nuevoComentario.innerHTML = comentario;
                comentariosContainer.appendChild(nuevoComentario);
            });
        }
    }
    
    numeroDeLike.textContent = numeroDeLikes;
});
