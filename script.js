const html = document.querySelector('html');

const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const btnTemporizador = document.querySelector('#start-pause');
const btnIniciarOuPausar = document.querySelector('#start-pause span');
const btnIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const btnMusica = document.querySelector('.toggle-checkbox');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const somPlay= new Audio('sons/play.wav');
const somPause= new Audio('sons/pause.mp3');
const somFim= new Audio('sons/beep.mp3');
musica.loop = true;


let tempoEmSegundos = 1500;

let intervaloId = null;

 


focobt.addEventListener('click', () => {
    tempoEmSegundos = 1500;
   alterarContexto('foco')
   focobt.classList.add('active')
})


curtobt.addEventListener('click', () => {
    tempoEmSegundos = 300;
   alterarContexto('descanso-curto')
   curtobt.classList.add('active')
})

longobt.addEventListener('click', () => {
    tempoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longobt.classList.add('active')   
})


function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach((botao) => {
        botao.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute("src",`imagens/${contexto}.png`);
    switch(contexto){
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;       
        
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`    
            break
        
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break

        default:
            break
    }


}

btnMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }
    else{
        musica.pause();
    }
})


const Contador = () => {
    if(tempoEmSegundos <= 0){
        somFim.play();
        alert("Tempo Finalizado!");
        zerar();
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo){
           const evento = new CustomEvent('focoFinalizado');
           document.dispatchEvent(evento); 
        }

        
        return;
    }
    tempoEmSegundos -= 1;
    mostrarTempo();
    console.log("Temporizador:"+tempoEmSegundos);
}

function zerar() {
    clearInterval(intervaloId);
    btnIniciarOuPausar.textContent = "Começar";
    btnIcone.src = "/imagens/play_arrow.png"
    intervaloId = null;

}

function iniciaPausaContador(){
    if(intervaloId){
        somPause.play();
        zerar();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(Contador, 1000);
    btnIniciarOuPausar.textContent = "Pausar";
    btnIcone.src = "/imagens/pause.png"
}

btnTemporizador.addEventListener('click', iniciaPausaContador);

function mostrarTempo(){
    const tempo = new Date(tempoEmSegundos * 1000).toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempo}`
}

mostrarTempo();