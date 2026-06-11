const emojis = [
    "🎂","🎂",
    "🎵","🎵",
    "😎","😎",
    "💻","💻",
    "🍕","🍕",
    "🎉","🎉",
    "❤️","❤️",
    "⭐","⭐"
];

const tabuleiro = document.getElementById("tabuleiro");
const tempoSpan = document.getElementById("tempo");
const jogadasSpan = document.getElementById("jogadas");
const mensagem = document.getElementById("mensagem");
const reiniciarBtn = document.getElementById("reiniciar");

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;

let jogadas = 0;
let paresEncontrados = 0;
let tempo = 0;
let cronometro;

function iniciarCronometro() {
    clearInterval(cronometro);

    tempo = 0;
    tempoSpan.textContent = tempo;

    cronometro = setInterval(() => {
        tempo++;
        tempoSpan.textContent = tempo;
    }, 1000);
}

function criarJogo() {

    tabuleiro.innerHTML = "";

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;

    jogadas = 0;
    paresEncontrados = 0;

    jogadasSpan.textContent = 0;
    mensagem.textContent = "";

    const cartasEmbaralhadas = [...emojis];

    cartasEmbaralhadas.sort(() => Math.random() - 0.5);

    cartasEmbaralhadas.forEach(emoji => {

        const carta = document.createElement("div");

        carta.classList.add("carta");
        carta.classList.add("escondida");

        carta.textContent = emoji;

        carta.addEventListener("click", () => {

            if (
                bloqueado ||
                carta === primeiraCarta ||
                !carta.classList.contains("escondida")
            ) {
                return;
            }

            carta.classList.remove("escondida");
            carta.classList.add("aberta");

            if (!primeiraCarta) {
                primeiraCarta = carta;
                return;
            }

            segundaCarta = carta;

            jogadas++;
            jogadasSpan.textContent = jogadas;

            if (
                primeiraCarta.textContent ===
                segundaCarta.textContent
            ) {

                paresEncontrados++;

                primeiraCarta = null;
                segundaCarta = null;

                if (paresEncontrados === 8) {

                    clearInterval(cronometro);

                    mensagem.textContent =
                        `🎉 Você venceu em ${jogadas} jogadas e ${tempo} segundos!`;
                }

            } else {

                bloqueado = true;

                setTimeout(() => {

                    primeiraCarta.classList.add("escondida");
                    segundaCarta.classList.add("escondida");

                    primeiraCarta.classList.remove("aberta");
                    segundaCarta.classList.remove("aberta");

                    primeiraCarta = null;
                    segundaCarta = null;

                    bloqueado = false;

                }, 1000);
            }
        });

        tabuleiro.appendChild(carta);
    });
}

reiniciarBtn.addEventListener("click", () => {
    criarJogo();
    iniciarCronometro();
});

criarJogo();
iniciarCronometro();
