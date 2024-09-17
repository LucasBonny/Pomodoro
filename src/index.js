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
    let movedArray = listaAtiva.splice(parseInt(num), 1);
    listaPassiva.push(movedArray[0]);
    adicionar();

}
function subir2(num){
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
    if(!(interval == null)) clearInterval(interval);
    if(listaAtiva.length < 2) return alert("Insira no minimo 2 atividades para o pomodoro!");
    timer();
}

//rodar un timer de forma decrescente até o 00:00, ao fazer isso, irá remover da lista o indice 0 e adicionar na lista novamente
//ao concluir o primeiro, fazer um splice e adicionar ele novamente no final, e recomeçar o timer de acordo com o novo tempo
function timer(){
    //na hora que o timer iniciar
    document.getElementById('atividade').innerHTML = listaAtiva[0]['nome'];
    let minutos = (listaAtiva[0].tempo - 1) < 10 ? "0" + (listaAtiva[0].tempo - 1) :(listaAtiva[0].tempo - 1);
    let segundos = 59;
    interval = setInterval((function relogio(){
        segundos = segundos < 10 ? "0" + segundos : segundos;
        timer2.innerHTML = `${minutos}:${segundos}`;
        if(segundos == 0){
            if(minutos == 0) {
                listaAtiva.splice(0,1);
                console.log("acabou!");
                
                //muda de tarefa
                if(listaAtiva.length == 0) {
                    timer2.innerHTML = "00:00";
                    
                    return clearInterval(interval);
                    
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
    if(listaAtiva.length == 0) ;
}
function pararPomodoro(){
    if(!(interval == null)){
        clearInterval(interval);
        timer2.innerHTML = "00:00";
        document.getElementById('atividade').innerHTML = "Ligue o Pomodoro primeiro!";

    }
    else{
        alert("Inicie primeiro o pomodoro!");
    }
}
function pausarPomodoro(){
    if(!(interval == null)){
        clearInterval(interval);
    }
    else{
        alert("Inicie primeiro o pomodoro!");
    }
}

//ao concluir qualquer atividade, tocar uma notificação

//não necessariamente precisará readicionar