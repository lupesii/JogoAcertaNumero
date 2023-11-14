let numerosSorteados = [];
let numAleatorio = gerarNumero();
let tentativas = 0;

function escreverHTML(tag, texto){
    var campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate: 1.2});
}

function mensagemInicial(){
    escreverHTML('h1', 'Jogo do Número Secreto');
    escreverHTML('p', 'Escolha um número entre 1 à 10');
}

function gerarNumero() {
    let n1 = parseInt(Math.random() * 10 + 1);

    if(numerosSorteados.length == 10){
        numerosSorteados = []
    }
    
    if(numerosSorteados.includes(n1)){
        return gerarNumero();
    }
    else{
        numerosSorteados.push(n1);
        return n1;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavra = tentativas < 1 ? 'tentativa' : 'tentativas';
    tentativas++;

    if(chute == numAleatorio){
        document.getElementById('reiniciar').removeAttribute('disabled');

        escreverHTML('h1', 'ACERTOU!!');
        escreverHTML('p', `Você descobriu o número secreto com ${tentativas} ${palavra}`);
    }
    else if(chute > numAleatorio){
        escreverHTML('p', `Número secreto é menor que ${chute}`);
        limparCampo();
    }
    else{
        limparCampo();
        escreverHTML('p', `Número secreto é maior que ${chute}`);
    }
}

function reiniciarJogo(){
    numAleatorio = gerarNumero();
    tentativas = 0;

    limparCampo();
    mensagemInicial();

    document.getElementById('reiniciar').setAttribute('disabled', true);
}

mensagemInicial();