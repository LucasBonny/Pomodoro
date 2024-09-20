/* 

LISTA DA ESQUERDA - OK 

Subir OK
Descer OK
Passar para a direita OK
Remover OK

*/
let listaPassiva = [];
let linha = document.getElementById('linha');
let nome = document.getElementById('tarefa');
let tempo = document.getElementById('tempo');
// LISTA DA DIREITA - OK
let listaAtiva = [];
let linha2 = document.getElementById('linha2');
let nome2 = document.getElementById('tarefa2');
let tempo2 = document.getElementById('tempo2');

//Pomodoro
let interval;
let timer2 = document.getElementById('timer');
let minutos = 0;
let segundos = 0;

function criar(){
    //dado a ser inserido na lista
    if(nome.value == '' || tempo.value == '') return alert("Preencha as informações antes de criar!");
    let inserir = {
        nome: nome.value,
        tempo: parseInt(tempo.value)
    };
    listaPassiva.push(inserir);
    nome.value = '';
    tempo.value = '';
    adicionar();
}
//interações entre as tabelas
//mostrar na tela
function adicionar(){
    //tabela
    linha.innerHTML = '';
    linha2.innerHTML = '';
    
    for(let i = 0; i < listaPassiva.length; i++){
        linha.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${listaPassiva[i]['nome']}</td>
                <td>${listaPassiva[i]['tempo']} minutos</td>
                <td>
                    <button id="interacao" onclick="subir(${i})">⬆</button>
                    <button id="interacao" onclick="descer(${i})">⬇</button>
                    <button id="interacao" onclick="direita(${i})">➡</button>
                    <button id="interacao" onclick="retirar(${i})">X</button>
                </td>
            </tr>
    `;
    }
    for(let i = 0; i < listaAtiva.length; i++){
        linha2.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${listaAtiva[i]['nome']}</td>
                <td>${listaAtiva[i]['tempo']} minutos</td>
                <td>
                    <button id="interacao" onclick="subir2(${i})">⬆</button>
                    <button id="interacao" onclick="descer2(${i})">⬇</button>
                    <button id="interacao" onclick="esquerda(${i})">⬅</button>
                </td>
            </tr>
    `;
    }


}
//passar de passiva para ativa
//lembrando que para isso deverá remover da lista passiva e cria na lista ativa

function direita(num){
    if(!(interval == null)) return alert("Pare o pomodoro para mexer na estrutura de tarefas!");
    let movedArray = listaPassiva.splice(parseInt(num), 1);
    listaAtiva.push(movedArray[0]);
    adicionar();

}
//fazer o ??
function subir(num){
    if(parseInt(num) === 0){
        console.log("Deu Certo!");
    }
    else{
        let atual = listaPassiva[parseInt(num)];
        let decima = listaPassiva[parseInt(num) - 1];
        listaPassiva[parseInt(num)] = decima;
        listaPassiva[parseInt(num) - 1] = atual;
        adicionar();
    }
}
function descer(num){
    if(parseInt(num) + 1 === listaPassiva.length){
        console.log("Deu Certo!");
    }
    else{
        let atual = listaPassiva[parseInt(num)];
        let debaixo = listaPassiva[parseInt(num) + 1];
        listaPassiva[parseInt(num)] = debaixo;
        listaPassiva[parseInt(num) + 1] = atual;
        adicionar();
    }

}
function retirar(num){
    listaPassiva.splice(parseInt(num), 1);
    adicionar();
}

//tabela da direita
function esquerda(num){
    if(!(interval == null)) return alert("Pare o pomodoro para mexer na estrutura de tarefas!");
    let movedArray = listaAtiva.splice(parseInt(num), 1);
    listaPassiva.push(movedArray[0]);
    adicionar();

}
function subir2(num){
    if(!(interval == null)) return alert("Pare o pomodoro para mexer na estrutura de tarefas!");
    if(parseInt(num) === 0){
        console.log("Deu Certo!");
    }
    else{
        let atual = listaAtiva[parseInt(num)];
        let decima = listaAtiva[parseInt(num) - 1];
        listaAtiva[parseInt(num)] = decima;
        listaAtiva[parseInt(num) - 1] = atual;
        adicionar();
    }
}
function descer2(num){
    if(!(interval == null)) return alert("Pare o pomodoro para mexer na estrutura de tarefas!");
    if(parseInt(num) + 1 === listaAtiva.length){
        console.log("Deu Certo!");
    }
    else{
        let atual = listaAtiva[parseInt(num)];
        let debaixo = listaAtiva[parseInt(num) + 1];
        listaAtiva[parseInt(num)] = debaixo;
        listaAtiva[parseInt(num) + 1] = atual;
        adicionar();
    }

}
//POMODORO

//obrigatoriamente ter no minimo 2 atividades
//se ele tiver 2, iniciar de forma ordenada
function iniciarPomodoro(){
    if(!(interval == null)) return alert("Pause ou pare o pomodoro!");
    if(listaAtiva.length < 2) return alert("Insira no minimo 2 atividades para o pomodoro!");
    timer();
}

//rodar un timer de forma decrescente até o 00:00, ao fazer isso, irá remover da lista o indice 0 e adicionar na lista novamente
//ao concluir o primeiro, fazer um splice e adicionar ele novamente no final, e recomeçar o timer de acordo com o novo tempo
function timer(){
    //na hora que o timer iniciar
    document.getElementById('atividade').innerHTML = listaAtiva[0]['nome'];
    minutos = (listaAtiva[0].tempo - 1) < 10 ? "0" + (listaAtiva[0].tempo - 1) :(listaAtiva[0].tempo - 1);
    segundos = 59;
    interval = setInterval((function relogio(){
        segundos = segundos < 10 ? "0" + segundos : segundos;
        if(minutos > 60){
            let horas = parseInt(minutos / 60);
            let minutos2 = minutos % 60;
            let horas2 = (horas) < 10 ? "0" + (horas) : horas;
            minutos2 = (minutos2) < 10 ? "0" + (minutos2) : minutos2;
            timer2.innerHTML = `${horas2}:${minutos2}:${segundos}`;
 
        }
        else{
            timer2.innerHTML = `${minutos}:${segundos}`;
        }
        if(segundos == 0){
            if(minutos == 0) {
                listaAtiva.splice(0,1);
                notificacao();
                
                //muda de tarefa
                if(listaAtiva.length == 0) {
                    adicionar();
                    return pararPomodoro();
                    
                }
                document.getElementById('atividade').innerHTML = listaAtiva[0]['nome']; 
                minutos = (listaAtiva[0].tempo - 1) < 10 ? "0" + (listaAtiva[0].tempo) :(listaAtiva[0].tempo);
                segundos = 59;
            }
            minutos--;
            adicionar();
            segundos = 60;

        }
        segundos--;
    }),1000);
    //na hora que o timer zerar
}
function pararPomodoro(){
    if(!(interval == null)){
        clearInterval(interval);
        interval = null;
        timer2.innerHTML = "00:00";
        document.getElementById('atividade').innerHTML = "Ligue o Pomodoro primeiro!";

    }
    else{
        alert("Inicie primeiro o pomodoro!");
    }
}
function pausarPomodoro(){
    
}

//ao concluir qualquer atividade, tocar uma notificação
function notificacao(){
    var audio = new Audio('src/ring.mp3');
    audio.play();
}

//não necessariamente precisará readicionar