console.log("JS carregou");
let contadorJogos = 0;
let paginaAtual = 1;
const porPagina = 20;
let todasCombinacoes = [];



const listaJogos = document.getElementById("listaJogos");
const resultado = document.getElementById("resultado");

document
    .getElementById("adicionarJogo")
    .addEventListener("click", adicionarJogo);

function adicionarJogo() {

    contadorJogos++;

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

        <h3>⚽ Jogo ${contadorJogos}</h3>

<div class="times">

    <div class="time">

        <label>Time da Casa</label>

        <input
        type="text"
        class="casa"
        placeholder="Ex: França">

        <label>Total de gols</label>

        <input
        type="number"
        class="maxCasa"
        value="0"
        min="0">

    </div>

    <div class="time">

        <label>Time Visitante</label>

        <input
        type="text"
        class="visitante"
        placeholder="Ex: Brasil">

        <label>Total de gols</label>

        <input
        type="number"
        class="maxVisitante"
        value="0"
        min="0">

    </div>

</div>
        

        <br><br>
        <hr>

<button
type="button"
class="abrirFiltros">

⚙️ Excluir placares

</button>

<div class="areaFiltros">

    <h4>Placares que não serão gerados</h4>

    <div class="linha-excluir">

        <input
        type="number"
        class="filtroCasa"
        min="0"
        placeholder="Casa">

        <span>x</span>

        <input
        type="number"
        class="filtroVisitante"
        min="0"
        placeholder="Visitante">

        <button
        type="button"
        class="adicionarFiltroPlacar">

        Adicionar

        </button>

    </div>

    <div class="listaFiltrosPlacar"></div>

</div>



        <button class="remover">
            🗑 Remover Jogo
        </button>

    `;

    card.querySelector(".remover").addEventListener("click", function () {
        card.remove();
    });
const inputCasa = card.querySelector(".casa");
const inputVisitante = card.querySelector(".visitante");
card.filtrosPlacares = [];

card.querySelector(".adicionarFiltroPlacar")
.addEventListener("click", function(){

    const casa =
    card.querySelector(".filtroCasa").value;

    const visitante =
    card.querySelector(".filtroVisitante").value;

    if(casa === "" || visitante === "") return;

    const placar = casa + "-" + visitante;

    if(!card.filtrosPlacares.includes(placar)){

        card.filtrosPlacares.push(placar);

    }

    atualizarListaFiltros(card);

});
    listaJogos.appendChild(card);
    const btnAbrir = card.querySelector(".abrirFiltros");
const areaFiltros = card.querySelector(".areaFiltros");

areaFiltros.style.display = "none";

btnAbrir.addEventListener("click", function(){

    if(areaFiltros.style.display === "none"){

        areaFiltros.style.display = "block";
        btnAbrir.textContent = "▲ Ocultar filtros";

    }else{

        areaFiltros.style.display = "none";
        btnAbrir.textContent = "⚙️ Excluir placares";

    }

});

}
document
    .getElementById("gerar")
    .addEventListener("click", gerarPlacares);

function gerarPlacares(){

    resultado.innerHTML = "";

    const jogos = document.querySelectorAll(".card");

    let todosPlacares = [];
    let textoFiltrosJogos = "";


    // CRIA OS PLACARES DE CADA JOGO
    jogos.forEach(jogo => {

        let placaresDoJogo = [];

        const casa = jogo.querySelector(".casa").value || "Casa";
        const visitante = jogo.querySelector(".visitante").value || "Visitante";


const minCasa = 0;
const maxCasa = Number(jogo.querySelector(".maxCasa").value);

const minVisitante = 0;
const maxVisitante = Number(jogo.querySelector(".maxVisitante").value);
let resumoJogo = "";
let temFiltro = false;


if(jogo.filtrosPlacares.length){

    jogo.filtrosPlacares.forEach(placar=>{

        resumoJogo +=
        `❌ Placar excluído: ${placar.replace("-"," x ")}<br>`;

    });

    temFiltro = true;

}

if(temFiltro){

    textoFiltrosJogos += `
    <br>
    <strong>${casa} x ${visitante}</strong><br>
    ${resumoJogo}
    `;

}

for(let gCasa = minCasa; gCasa <= maxCasa; gCasa++){

    for(let gVisitante = minVisitante; gVisitante <= maxVisitante; gVisitante++){

        const placarAtual = gCasa + "-" + gVisitante;


        if(jogo.filtrosPlacares.includes(placarAtual)){

            continue;

        }

        placaresDoJogo.push({

            casa,
            visitante,
            golsCasa:gCasa,
            golsVisitante:gVisitante

        });


    }

}

        todosPlacares.push(placaresDoJogo);


    });

    // FAZ A MULTIPLICAÇÃO DAS POSSIBILIDADES

    let combinacoes = [[]];


    todosPlacares.forEach(lista => {


        let novasCombinacoes = [];


        combinacoes.forEach(combinacaoAtual => {


            lista.forEach(placar => {


                novasCombinacoes.push([
                    ...combinacaoAtual,
                    placar
                ]);


            });

        });

        combinacoes = novasCombinacoes;

    });


document.querySelector("#total").innerHTML = `
<strong>Total de combinações:</strong> ${combinacoes.length.toLocaleString("pt-BR")}
`;

document.querySelector("#resumoFiltros").innerHTML = `
<strong>Filtros aplicados:</strong> ${textoFiltrosJogos || "Nenhum filtro aplicado"}
`;
verificarResumo();


todasCombinacoes = combinacoes;

paginaAtual = 1;

mostrarPagina();
    
}
function mostrarPagina(){

    let inicio = (paginaAtual - 1) * porPagina;
    let fim = inicio + porPagina;


    let pagina = todasCombinacoes.slice(inicio, fim);


    let html = `

    <table>

    <tr>

    <th>Aposta</th>
    `;


    if(pagina.length > 0){

        pagina[0].forEach((jogo,index)=>{

            html += `
            <th>Jogo ${index+1}</th>
            `;

        });

    }

    html += "</tr>";

    pagina.forEach((aposta,index)=>{


        html += `

        <tr>

        <td>
        ${(inicio + index)+1}
        </td>

        `;


        aposta.forEach(jogo=>{


            html += `

            <td>
            ${jogo.casa}
            ${jogo.golsCasa}
            x
            ${jogo.golsVisitante}
            ${jogo.visitante}
            </td>

            `;

        });

        html += "</tr>";

    });

    html += `

    </table>

    <div class="paginacao">

    <button onclick="paginaAnterior()">
    ⬅ Anterior
    </button>


    <span>
    Página ${paginaAtual} de 
    ${Math.ceil(todasCombinacoes.length / porPagina)}
    </span>


    <button onclick="proximaPagina()">
    Próxima ➡
    </button>

    </div>

    `;

    resultado.innerHTML = html;

}
function proximaPagina(){

    if(paginaAtual < Math.ceil(todasCombinacoes.length / porPagina)){

        paginaAtual++;

        mostrarPagina();

    }

}


function paginaAnterior(){

    if(paginaAtual > 1){

        paginaAtual--;

        mostrarPagina();

    }

}

document
.getElementById("exportarPDF")
.addEventListener("click", exportarPDF);

function exportarPDF(){


    if(todasCombinacoes.length === 0){

        alert("Gere as combinações primeiro!");

        return;

    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF('landscape');

    doc.text(
        "Gerador de Desdobramentos",
        14,
        15
    );

    let dados = [];

    todasCombinacoes.forEach((aposta,index)=>{

        let linha = [];

        linha.push(index + 1);

        aposta.forEach(jogo=>{

            linha.push(
                `${jogo.casa} ${jogo.golsCasa}x${jogo.golsVisitante} ${jogo.visitante}`
            );

        });

        dados.push(linha);

    });

    let cabecalho = [
        "Aposta"
    ];

    if(todasCombinacoes.length > 0){

        todasCombinacoes[0].forEach((jogo,index)=>{

            cabecalho.push(
                "Jogo " + (index+1)
            );

        });

    }

    doc.autoTable({

        head:[cabecalho],

        body:dados,

        startY:25,

        styles:{
            fontSize:8
        }

    });

    doc.save(
        "desdobramentos.pdf"
    );

}
function atualizarListaFiltros(card){

    const lista =
    card.querySelector(".listaFiltrosPlacar");

    lista.innerHTML = "";

    card.filtrosPlacares.forEach((placar,index)=>{

        lista.innerHTML += `

        <p>

        ❌ ${placar.replace("-","x")}

        <button
        onclick="removerFiltro(this,${index})">

        Remover

        </button>

        </p>

        `;

    });

}
function removerFiltro(botao,index){

    const card =
    botao.closest(".card");

    card.filtrosPlacares.splice(index,1);

    atualizarListaFiltros(card);

}
function verificarResumo() {

    const total = document.getElementById("total").innerHTML.trim();
    const filtros = document.getElementById("resumoFiltros").innerHTML.trim();
    const painel = document.getElementById("painelResumo");

    if (total === "" && filtros === "") {
        painel.style.display = "none";
    } else {
        painel.style.display = "block";
    }

}
verificarResumo();
