const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const imgBt = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const musicaInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
 const somIniciar = new Audio('/sons/play.wav')
 const somPausar = new Audio('/sons/pause.mp3')
 const somZerar = new Audio('/sons/beep.mp3')

musica.loop=true

let tempoDecorridoEmSegundos = 1500 //guardando o valor do contador de segundos (que vai se alterar dinamicamente) numa variavel
let intervaloId = null

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})
focoBt.addEventListener('click', () => { // '() =>' é uma arrow function 
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

                                        //MUDANDO A FOTO E COR DE FUNDO DOS MODOS DE CONTEXTO
function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){ // Neste trecho de código, a função alterarContexto percorre todos os botões e remove a classe "active" de cada um deles, garantindo que apenas um botão fique ativo por vez.
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)// primeiro parametro é onde vc quer mexer (no 'data-contexto'), o segundo é para o que você quer mudar (para 'foco')
    banner.setAttribute('src', `imagens/${contexto}.png`)

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = 
            'Otimiza sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa</strong>'
            break;

        case 'descanso-curto':
            titulo.innerHTML = 
            'Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta</strong>'
            break;
        case 'descanso-longo':
            titulo.innerHTML = 'Hora de voltar à superfície<br> <strong class="app__title-strong">Faça uma pausa longa</strong>'
        default: 
            break;
    }
}


                                            // FAZENDO O CRONOMETRO

const contagemRegressiva = () => { //guardando uma FUNÇÃO (função de seta[arrow function]) dentro de uma VARIAVEL (CONST) para decrementar (ir diminuindo) o contador    
    if (tempoDecorridoEmSegundos <= 0){
        // somZerar.play()
        alert('Tempo acabou')
        musica.pause()
        zerar() //quando o tempoDecorrdioEmSegundos for menos ou igual a 0, eu trago a função interromper a função (para não contar mais) e declarar o valor valor do intervaloId como null de novo
        return
    }
    tempoDecorridoEmSegundos -= 1 
    mostrarTempo()
}

                                //FAZENDO AÇÃO QUANDO ELE CLICAR

startPauseBt.addEventListener('click', iniciarOuPausar) //quando clicado, vai chamar a função IniciarTemporizador que vai chamar a função 'contagemRegressiva' onde vai sempre diminuir 1 do valor definido em "tempoDecorridoEmSegundos" e vai setar um intervalor de 1s (1000) para cada 1 que diminuir do valor de tempoDecorridoEmSegundos


                // INICIA OU PAUSA DE ACORDO COM O CLICK NO ADDEVENTLISTENER DO STARPAUSEBT.
function iniciarOuPausar() {
    if(intervaloId != null ) {//de começo, o valor do intervalID é null, e assim, como no começo ele está como null, ele não vai fazer esse if e vai pular para baixo e vai receber o valor do setInterval (que vai ser 1)
        zerar() //Caso a contagem está acontecendo e como o intervaloID não está mais como null, quando clicarmos novamente no ADDEVENTLISTENER DO STARPAUSEBT, ele irá verificar esse IF. Assim, como o intervaloID vai ser diferente (!=) de null, ele irá fazer a função zerar() na qual PAUSA o setInterval

        // somPausar.play() //tocar sempre quando o intervaloId ter algum valor ainda, e quisermos interromper a contagem OBS: tirei pois ficou estranho
    
        iniciarOuPausarBt.textContent = "Retomar" //Informa que se clicar novamente no ADDEVENTLISTENER DO STARPAUSEBT, ele irá retormar a contagem
        imgBt.setAttribute('src', '/imagens/play_arrow.png');
        musicaInput.checked = false; //Desmarca o input de música quando o cronômetro é pausado
        musica.pause()//pausa a música, combinando com a desmarcação do input de música
        return 
    }
    somIniciar.play() //tocar sempre quando iniciar a contagem
    intervaloId = setInterval (contagemRegressiva, 1000) //assim, o intervaloId chama a função contagemRegressiva e seta em um intervalo de 1s (1000). Conseguimos setar isso, com o método serInterval ele pede onde vc quer setar esse intervalo e com quantos segundos 
    iniciarOuPausarBt.textContent = "Pausar"; //Quando o cronometro é iniciado, já vai aparecer o label de "pausar"
    musicaInput.checked = true; // Marca o input de música quando o cronômetro é iniciado
    imgBt.setAttribute('src', '/imagens/pause.png'); //Define a imagem de pausar 
    musica.play() //toca a música, combinando com a marcação do input de música
}

//QUANDO O ADDEVENTLISTENER DO STARPAUSEBT É CLICADO E AINDA EXISTE ALGUM VALOR DENTRO DE INTERVALDOID, É CHAMADO ESSA FUNÇÃO ZERAR() PARA QUEM O CLEARINTERVAL PAUSE A CONTAGEM
function zerar () {
    clearInterval(intervaloId) //pausa a contagem
    iniciarOuPausarBt.textContent = "Começar" //aparece 
    intervaloId=null
}

function mostrarTempo (){
    const tempo = new Date(tempoDecorridoEmSegundos*1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo() // PARA SEMPRE MOSTRAR O TIMER