const tabuleiro = document.querySelector(".tabuleiro");
const cartas = document.querySelectorAll(".carta");

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let paresEncontrados = 0;


// ========================================
// EMBARALHAR
// ========================================

function embaralhar() {

    let posicoes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    posicoes.sort(function() {
        return Math.random() - 0.5;
    });

    cartas.forEach(function(carta, indice) {

        carta.style.order = posicoes[indice];

    });

}


// Embaralha quando abre a página
embaralhar();


// ========================================
// CLIQUE NO TABULEIRO
// ========================================

tabuleiro.addEventListener("click", function(evento) {

    // Descobre qual carta foi clicada
    const carta = evento.target.closest(".carta");


    // Se não clicou em uma carta
    if (carta === null) {
        return;
    }


    // Se o jogo estiver bloqueado
    if (bloqueado === true) {
        return;
    }


    // Não deixa clicar numa carta que já está virada
    if (carta.classList.contains("virada")) {
        return;
    }


    // Vira a carta
    carta.classList.add("virada");


    // ========================================
    // PRIMEIRA CARTA
    // ========================================

    if (primeiraCarta === null) {

        primeiraCarta = carta;

        return;
    }


    // ========================================
    // SEGUNDA CARTA
    // ========================================

    segundaCarta = carta;

    // BLOQUEIA IMEDIATAMENTE
    bloqueado = true;

    verificarPar();

});


// ========================================
// VERIFICAR PAR
// ========================================

function verificarPar() {

    // Guarda cópias das duas cartas
    const carta1 = primeiraCarta;
    const carta2 = segundaCarta;


    // ========================================
    // ACERTOU
    // ========================================

    if (carta1.dataset.carta === carta2.dataset.carta) {

        paresEncontrados++;

        primeiraCarta = null;
        segundaCarta = null;

        bloqueado = false;


        // Encontrou os 6 pares
        if (paresEncontrados === 6) {

            bloqueado = true;

            setTimeout(function() {

                reiniciarJogo();

            }, 1500);

        }

    }


    // ========================================
    // ERROU
    // ========================================

    else {

        setTimeout(function() {

            carta1.classList.remove("virada");
            carta2.classList.remove("virada");

            primeiraCarta = null;
            segundaCarta = null;

            // SOMENTE AGORA libera novos cliques
            bloqueado = false;

        }, 700);

    }

}


// ========================================
// REINICIAR O JOGO
// ========================================

function reiniciarJogo() {

    bloqueado = true;

    cartas.forEach(function(carta) {

        carta.classList.remove("virada");

    });


    primeiraCarta = null;
    segundaCarta = null;
    paresEncontrados = 0;


    setTimeout(function() {

        embaralhar();

        bloqueado = false;

    }, 700);

}