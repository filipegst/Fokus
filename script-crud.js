const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel')
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')


let tarefaSelecionada = null;
let litarefaSelecionada = null;



let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}



function criarElementoTarefa(tarefa) {
  


    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = 
    `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const p = document.createElement('p');
    p.classList.add('app__section-task-list-item-description')
    p.textContent = tarefa.descricao;

    const button = document.createElement('button');
    button.classList.add('app_button-edit');
    const imgButton = document.createElement('img');
    imgButton.src = '/imagens/edit.png';

    button.onclick = () => {
        debugger
        const novaDescricao =  prompt('Digite a nova tarefa', tarefa.descricao);
        if(novaDescricao){
            p.textContent = novaDescricao;
             tarefa.descricao = novaDescricao;
             atualizarTarefas();
        }
    }

    button.append(imgButton);

    li.append(svg, p, button);


    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        button.setAttribute('disabled', 'disabled');
        } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active');
            })
        
            if (tarefaSelecionada == tarefa) {
                tarefaSelecionada = null;
                litarefaSelecionada = null;
                paragrafoDescricaoTarefa.textContent = '';
                return
            }
        
            tarefaSelecionada = tarefa;
            litarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
        
            li.classList.add('app__section-task-list-item-active');
        }
    }

return li;



}



btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
});

btnCancelarTarefa.addEventListener('click', () => {
  formAdicionarTarefa.classList.toggle('hidden'); 
  textArea.value = '';
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
   const tarefa = {
        descricao: textArea.value,
    }
    tarefas.push(tarefa);
    const ElementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(ElementoTarefa);
    atualizarTarefas();
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});

tarefas.forEach(tarefa => {
   const ElementoTarefa =  criarElementoTarefa(tarefa);
   ulTarefas.append(ElementoTarefa);
    
});


document.addEventListener('focoFinalizado', () => {
    if ( tarefaSelecionada && litarefaSelecionada) {
        litarefaSelecionada.classList.remove('app__section-task-list-item-active')
        litarefaSelecionada.classList.add('app__section-task-list-item-complete')
        litarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true
        atualizarTarefas()
    }
})


const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)
btnRemoverTodas.onclick = () => removerTarefas(false)