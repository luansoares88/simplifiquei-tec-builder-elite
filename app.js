/* ==================================================
   SIMPLIFIQUEI TEC BUILDER ELITE
   APP.JS
   PARTE 1
================================================== */

let treinoAtual = "A";

let tempoRestante = 90;

let intervalo = null;


/* ==========================================
INICIAR
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarAplicativo();

});


function iniciarAplicativo(){

    iniciarSplash();

    configurarMenu();

    carregarTreino(treinoAtual);

}


/* ==========================================
SPLASH
========================================== */

function iniciarSplash(){

    const splash = document.getElementById("splash");

    const app = document.getElementById("app");

    app.style.display = "none";

    setTimeout(()=>{

        splash.style.opacity="0";

        setTimeout(()=>{

            splash.style.display="none";

            app.style.display="block";

        },500);

    },2000);

}


/* ==========================================
MENU
========================================== */

function configurarMenu(){

const botao=document.getElementById("menuButton");

const menu=document.getElementById("sideMenu");

const overlay=document.getElementById("overlay");

botao.onclick=()=>{

menu.classList.add("active");

overlay.classList.add("active");

}

overlay.onclick=()=>{

menu.classList.remove("active");

overlay.classList.remove("active");

}

}


/* ==========================================
CRONÔMETRO
========================================== */

function startTimer(segundos){

clearInterval(intervalo);

tempoRestante=segundos;

const visor=document.getElementById("timerDisplay");

const visorGrande=document.getElementById("cronometroGrande");

intervalo=setInterval(()=>{

tempoRestante--;

visor.innerHTML=tempoRestante;

if(visorGrande){

visorGrande.innerHTML=tempoRestante;

}

if(tempoRestante<=0){

clearInterval(intervalo);

alert("Descanso finalizado!");

}

},1000);

}


/* ==========================================
MODAL
========================================== */

function abrirCronometro(){

document.getElementById("cronometroModal").style.display="flex";

}

function fecharCronometro(){

document.get

function carregarTreino(letra){

    treinoAtual = letra;

    const container = document.getElementById("listaExercicios");

    if(!container) return;

    container.innerHTML = "";

    const lista = treinos[letra];

    lista.forEach((exercicio, indice)=>{

        const card = document.createElement("div");

        card.className = "exercise-card";

        let seriesHTML = "";

        for(let i=1;i<=exercicio.series;i++){

            seriesHTML += `
            <label class="serie">
                <input type="checkbox"
                       onchange="atualizarProgresso()">
                Série ${i}
            </label>`;
        }

        card.innerHTML = `

        <div class="exercise-title">

            ${exercicio.nome}

        </div>

        <div class="exercise-info">

            <span>${exercicio.grupo}</span>

            <span>${exercicio.reps}</span>

        </div>

        <div class="series">

            ${seriesHTML}

        </div>

        <div class="exercise-actions">

            <button class="btn-video"
            onclick="window.open('${exercicio.video}','_blank')">

            ▶ Ver execução

            </button>

            <button class="btn-save"
            onclick="startTimer(${exercicio.descanso})">

            ⏱ Descanso

            </button>

        </div>

        <p style="margin-top:15px;color:#CBD5E1;">

        ${exercicio.observacao}

        </p>

        `;

        container.appendChild(card);

    });

    atualizarProgresso();

}


/* ==========================================
ABAS
========================================== */

function mostrarTreino(letra){

    document.querySelectorAll(".tab").forEach(tab=>{

        tab.classList.remove("active");

    });

    const botoes = document.querySelectorAll(".tab");

    if(letra==="A") botoes[0].classList.add("active");
    if(letra==="B") botoes[1].classList.add("active");
    if(letra==="C") botoes[2].classList.add("active");

    carregarTreino(letra);

}


/* ==========================================
PROGRESSO
========================================== */

function atualizarProgresso(){

    const checks = document.querySelectorAll(".serie input");

    let feitos = 0;

    checks.forEach(c=>{

        if(c.checked) feitos++;

    });

    const percentual =
        checks.length === 0
        ? 0
        : Math.round((feitos/checks.length)*100);

    document.getElementById("progressFill").style.width =
        percentual + "%";

    document.getElementById("progressText").innerHTML =
        percentual + "%";

}
/* ==========================================
LOCAL STORAGE
========================================== */

function salvarProgresso(){

const checks=document.querySelectorAll(".serie input");

const dados=[];

checks.forEach(c=>{

dados.push(c.checked);

});

localStorage.setItem(

"treino_"+treinoAtual,

JSON.stringify(dados)

);

}


function carregarProgresso(){

const salvo=localStorage.getItem(

"treino_"+treinoAtual

);

if(!salvo) return;

const dados=JSON.parse(salvo);

const checks=document.querySelectorAll(".serie input");

checks.forEach((c,i)=>{

if(dados[i]){

c.checked=true;

}

});

atualizarProgresso();

}


/* ==========================================
ATUALIZA PROGRESSO
========================================== */

function atualizarProgresso(){

const checks=document.querySelectorAll(".serie input");

let feitos=0;

checks.forEach(c=>{

if(c.checked){

feitos++;

}

});

const percentual=

checks.length===0

?0

:Math.round(

(feitos/checks.length)*100

);

document.getElementById(

"progressFill"

).style.width=

percentual+"%";

document.getElementById(

"progressText"

).innerHTML=

percentual+"%";

salvarProgresso();

}


/* ==========================================
TOAST
========================================== */

function mostrarToast(texto){

const toast=document.getElementById("toast");

const msg=document.getElementById("toastMessage");

if(!toast || !msg) return;

msg.innerHTML=texto;

toast.style.display="block";

setTimeout(()=>{

toast.style.display="none";

},2500);

}


/* ==========================================
TROCA TREINO
========================================== */

function mostrarTreino(letra){

treinoAtual=letra;

document.querySelectorAll(".tab")

.forEach(t=>{

t.classList.remove("active");

});

const abas=document.querySelectorAll(".tab");

if(letra==="A") abas[0].classList.add("active");

if(letra==="B") abas[1].classList.add("active");

if(letra==="C") abas[2].classList.add("active");

carregarTreino(letra);

setTimeout(()=>{

carregarProgresso();

},50);

mostrarToast("Treino "+letra+" carregado.");

}


/* ==========================================
ALERTA FINAL
========================================== */

function finalizarTimer(){

if(navigator.vibrate){

navigator.vibrate([300,200,300]);

}

mostrarToast("Descanso finalizado!");

}


/* ==========================================
SUBSTITUA DENTRO DO startTimer()

APENAS ESTE TRECHO

if(tempoRestante<=0){

clearInterval(intervalo);

finalizarTimer();

}

========================================== */


/* ==========================================
INICIALIZAÇÃO FINAL
========================================== */

window.onload=()=>{

iniciarAplicativo();

mostrarTreino("A");

};
/* ==========================================
SALVAR CARGAS
========================================== */

function salvarCarga(indice){

const campo=document.getElementById(

"carga_"+indice

);

if(!campo) return;

localStorage.setItem(

"carga_"+treinoAtual+"_"+indice,

campo.value

);

}


function carregarCarga(indice){

return localStorage.getItem(

"carga_"+treinoAtual+"_"+indice

)||"";

}


/* ==========================================
SALVAR OBSERVAÇÕES
========================================== */

function salvarObservacao(indice){

const campo=document.getElementById(

"obs_"+indice

);

if(!campo) return;

localStorage.setItem(

"obs_"+treinoAtual+"_"+indice,

campo.value

);

}


function carregarObservacao(indice){

return localStorage.getItem(

"obs_"+treinoAtual+"_"+indice

)||"";

}


/* ==========================================
CRIAR CARD
SUBSTITUA O card.innerHTML
PELA VERSÃO ABAIXO
========================================== */

card.innerHTML=`

<div class="exercise-title">

${exercicio.nome}

</div>

<div class="exercise-info">

<span>

${exercicio.grupo}

</span>

<span>

${exercicio.reps}

</span>

</div>

<div class="series">

${seriesHTML}

</div>

<div class="campo">

<label>

Carga

</label>

<input

id="carga_${indice}"

type="text"

placeholder="Ex.: 80 kg"

value="${carregarCarga(indice)}"

onchange="salvarCarga(${indice})"

>

</div>

<div class="campo">

<label>

Observações

</label>

<textarea

id="obs_${indice}"

placeholder="Anotações..."

onchange="salvarObservacao(${indice})"

>${carregarObservacao(indice)}</textarea>

</div>

<div class="exercise-actions">

<button

class="btn-video"

onclick="window.open('${exercicio.video}','_blank')">

▶ Ver execução

</button>

<button

class="btn-save"

onclick="startTimer(${exercicio.descanso})">

⏱ ${exercicio.descanso}s

</button>

</div>

<p class="observacao">

${exercicio.observacao}

</p>

`;


/* ==========================================
ESTATÍSTICAS
========================================== */

function atualizarDashboard(){

const checks=document.querySelectorAll(".serie input");

let feitos=0;

checks.forEach(c=>{

if(c.checked){

feitos++;

}

});

document.getElementById(

"treinosRealizados"

).innerHTML=

feitos;

document.getElementById(

"streak"

).innerHTML=

localStorage.getItem("streak")||0;

}


/* ==========================================
SALVAR STREAK
========================================== */

function salvarStreak(){

let streak=

parseInt(

localStorage.getItem("streak")||0

);

streak++;

localStorage.setItem(

"streak",

streak

);

atualizarDashboard();

}
/* ==========================================
TEMA
========================================== */

function alterarTema(cor){

document.documentElement.style.setProperty(

"--blue",

cor

);

localStorage.setItem(

"tema",

cor

);

}


function carregarTema(){

const tema=

localStorage.getItem("tema");

if(!tema) return;

document.documentElement.style.setProperty(

"--blue",

tema

);

}


/* ==========================================
SALVAR PESO
========================================== */

function salvarPeso(){

const peso=prompt(

"Informe seu peso atual (kg):"

);

if(!peso) return;

localStorage.setItem(

"peso",

peso

);

document.getElementById(

"pesoAtual"

).innerHTML=

peso+" kg";

}


function carregarPeso(){

const peso=

localStorage.getItem("peso");

if(peso){

document.getElementById(

"pesoAtual"

).innerHTML=

peso+" kg";

}

}


/* ==========================================
BACKUP
========================================== */

function exportarBackup(){

const dados={

localStorage:{...localStorage}

};

const blob=new Blob(

[JSON.stringify(dados)],

{type:"application/json"}

);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="backup_treino.json";

a.click();

}


function importarBackup(event){

const arquivo=event.target.files[0];

if(!arquivo) return;

const leitor=new FileReader();

leitor.onload=function(e){

const dados=

JSON.parse(e.target.result);

Object.keys(

dados.localStorage

).forEach(chave=>{

localStorage.setItem(

chave,

dados.localStorage[chave]

);

});

location.reload();

};

leitor.readAsText(arquivo);

}


/* ==========================================
INSTALAR PWA
========================================== */

let installPrompt=null;

window.addEventListener(

"beforeinstallprompt",

(e)=>{

e.preventDefault();

installPrompt=e;

});

function instalarApp(){

if(!installPrompt) return;

installPrompt.prompt();

}


/* ==========================================
NOTIFICAÇÕES
========================================== */

function solicitarNotificacao(){

if(

Notification.permission==="default"

){

Notification.requestPermission();

}

}


function notificar(texto){

if(

Notification.permission==="granted"

){

new Notification(

texto

);

}

}


/* ==========================================
VIBRAÇÃO
========================================== */

function vibrar(){

if(

navigator.vibrate

){

navigator.vibrate(

[200,100,200]

);

}

}


/* ==========================================
SOM
========================================== */

function tocarSom(){

const audio=new Audio(

"assets/sounds/finish.mp3"

);

audio.play();

}


/* ==========================================
FINAL DO TIMER
========================================== */

function finalizarTimer(){

clearInterval(intervalo);

tocarSom();

vibrar();

mostrarToast(

"Descanso finalizado!"

);

notificar(

"Hora da próxima série!"

);

}


/* ==========================================
INICIALIZAÇÃO FINAL
========================================== */

window.onload=()=>{

carregarTema();

carregarPeso();

solicitarNotificacao();

iniciarAplicativo();

mostrarTreino("A");

};
/* ==========================================
SERVICE WORKER
========================================== */

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("sw.js")

.then(()=>{

console.log("Service Worker registrado.");

})

.catch(err=>{

console.log(err);

});

});

}
