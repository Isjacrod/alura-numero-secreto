//Variáveis de controle
let listaDeNumeros = [];
let numeroSecreto;
let tentativas;
let numeroMaximo = 100;
let voz = configuraVoz()

// Define a voz
function configuraVoz() {
    let sintese = new SpeechSynthesisUtterance();
    sintese.rate = 1.9;
    sintese.lang = 'pt-BR';
    return sintese; 
}

//Função que coloca texto em elementos
function defineTexto(tag, texto) {
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    voz.text = texto;
    window.speechSynthesis.speak(voz);
}

// Apresentação inicial
function cenaInicial(numeroMaximo) {
    //Define os textos
    defineTexto("p", `Escolha um número entre 1 e ${numeroMaximo}`);
    defineTexto("h1", "Bora Jogar");
}

function verificarChute() {
    let chute = document.querySelector("input").value;
    limparCampo();
    if (chute == numeroSecreto) {
        palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        defineTexto("h1", "Parabéns");
        defineTexto("p", `Você acertou o número secreto em ${tentativas} ${palavraTentativa}`);
        // habilita o botao para uma nova tentativa
        document.getElementById("reiniciar").disabled = false;
    } else {
        if (chute > numeroSecreto) {
            defineTexto("p", "O número é menor");
        } else {
            defineTexto("p", "O número é maior");
        }
        tentativas++;
    }
}

// limpa o campo do chute
function limparCampo() {
    let campo = document.querySelector("input");
    campo.value = "";
}

// retorna um numero aleatório entre a e b
function geraNumeroAleatorio(a, b) {
    if (listaDeNumeros.length == b) {
        fimDoJogo();
    } else {
        let numeroSorteado = parseInt(Math.random() * b + a);
        // Se já existe na lista tenta de novo
        if (listaDeNumeros.includes(numeroSorteado)) {
            return geraNumeroAleatorio(a, b);
        // Se não existe, coloca na lista e retorna
        } else {
            listaDeNumeros.push(numeroSorteado);
            return numeroSorteado;
        }
    }
}

// Inicia um novo jogo
function novoJogo(numeroMaximo) {
    cenaInicial(numeroMaximo)
    limparCampo();
    document.getElementById("reiniciar").disabled = true;
    tentativas = 1;
    numeroSecreto = geraNumeroAleatorio(1,numeroMaximo);  
}

// Escedeu possibilidades
function fimDoJogo() {
    defineTexto("h1", "Fim das posibilidades");
}

// Inicio
novoJogo(numeroMaximo)
