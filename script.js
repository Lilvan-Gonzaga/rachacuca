const containerJogo = document.getElementById("tabuleiro");
const exibicaoMovimentos = document.getElementById("movimentos");
const telaInicial = document.getElementById("tela-inicial");
const botaoIniciar = document.getElementById("botao-iniciar");
const telaJogo = document.getElementById("tela-jogo");
const botaoReiniciar = document.getElementById("botao-reiniciar");
const exibicaoTimer = document.getElementById("temporizador");

let tabuleiro = [];
let movimentos = 0;
let timer;
let tempoDecorrido = 0;

botaoIniciar.addEventListener('click', function() {
    telaInicial.style.display = 'none';
    telaJogo.style.display = 'block';
    iniciarTabuleiro();
    iniciarTimer();
});

function iniciarTimer() {
    tempoDecorrido = 0;
    exibicaoTimer.innerText = tempoDecorrido;
    timer = setInterval(() => {
        tempoDecorrido++;
        exibicaoTimer.innerText = tempoDecorrido;
    }, 1000);
}

function pararTimer() {
    clearInterval(timer);
}

function iniciarTabuleiro() {
    tabuleiro = [];
    let numeros = Array.from({ length: 15 }, (_, i) => i + 1).concat(0);
    numeros.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
        tabuleiro.push(numeros.splice(0, 4));
    }
    renderizarTabuleiro();
}

function renderizarTabuleiro() {
    containerJogo.innerHTML = "";
    tabuleiro.forEach((linha, i) => {
        linha.forEach((num, j) => {
            const peca = document.createElement("div");
            peca.className = num === 0 ? "tile empty" : "tile";
            peca.innerText = num === 0 ? "" : num;
            peca.addEventListener("click", () => moverPeca(i, j));
            containerJogo.appendChild(peca);
        });
    });
}

function encontrarPecaVazia() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (tabuleiro[i][j] === 0) return { x: i, y: j };
        }
    }
}

function moverPeca(x, y) {
    const vazia = encontrarPecaVazia();
    if ((Math.abs(x - vazia.x) === 1 && y === vazia.y) || (Math.abs(y - vazia.y) === 1 && x === vazia.x)) {
        [tabuleiro[x][y], tabuleiro[vazia.x][vazia.y]] = [tabuleiro[vazia.x][vazia.y], tabuleiro[x][y]];
        movimentos++;
        exibicaoMovimentos.innerText = movimentos;
        renderizarTabuleiro();

        if (estaResolvido()) {
            pararTimer();
            setTimeout(() => alert(`Parabéns! Você resolveu o Racha-Cuca em ${tempoDecorrido} segundos!`), 200);
        }
    }
}

function estaResolvido() {
    let k = 1;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (tabuleiro[i][j] !== (k % 16)) return false;
            k++;
        }
    }
    return true;
}

botaoReiniciar.addEventListener("click", () => {
    movimentos = 0;
    exibicaoMovimentos.innerText = movimentos;
    iniciarTabuleiro();
    pararTimer();
    iniciarTimer();
});

iniciarTabuleiro();
