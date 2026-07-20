const API = "https://sudati-api.robertosudatii.workers.dev";

let todosJogos = [];
let paginaJogos = 1;
const jogosPorPagina = 8;

// ===== TABELA =====

async function carregarTabela() {

    try {

        const resposta = await fetch(API + "/tabela");
        const dados = await resposta.json();

console.log(dados);

const tabela = dados.standings[0].table;


        document.getElementById("tabela").innerHTML =

        tabela.map(time => `

        <tr>

            <td>${time.position}</td>

            <td class="time">

    <img src="${time.team.crest}" alt="${time.team.name}">

    ${time.team.name}

</td>

            <td>${time.points}</td>

            <td>${time.playedGames}</td>

            <td>${time.won}</td>

            <td>${time.draw}</td>

            <td>${time.lost}</td>

        </tr>

        `).join("");


    } catch (erro) {

        document.getElementById("tabela").innerHTML =
        "<tr><td colspan='7'>Erro ao carregar tabela</td></tr>";

        console.log(erro);

    }

}



// ===== PRÓXIMOS JOGOS =====

async function carregarJogos() {

    try {

        const resposta = await fetch(API + "/proximos");

        const dados = await resposta.json();

        todosJogos = dados.matches;

        mostrarJogos();


    } catch (erro) {

        document.getElementById("jogos").innerHTML =
        "Erro ao carregar jogos";

        console.log(erro);

    }

}



function mostrarJogos() {


    const inicio = (paginaJogos - 1) * jogosPorPagina;

    const fim = inicio + jogosPorPagina;


    const jogosPagina = todosJogos.slice(inicio, fim);



    document.getElementById("jogos").innerHTML =


    jogosPagina.map(jogo => `


    <div class="jogo">


        <div class="times-jogo">

            <div>
                <img src="${jogo.homeTeam.crest}">
                <strong>${jogo.homeTeam.name}</strong>
            </div>


            <span>x</span>


            <div>
                <img src="${jogo.awayTeam.crest}">
                <strong>${jogo.awayTeam.name}</strong>
            </div>

        </div>


        <br>


        <div class="data-jogo">

${new Date(jogo.utcDate).toLocaleString("pt-BR")}

</div>


    </div>


    `).join("");



    document.getElementById("jogos").innerHTML += `


    <div class="paginacao">


        <button onclick="paginaAnterior()">
            ← Anterior
        </button>


        <span>
            Página ${paginaJogos} de ${Math.ceil(todosJogos.length / jogosPorPagina)}
        </span>


        <button onclick="proximaPagina()">
            Próxima →
        </button>


    </div>

    `;

}



function proximaPagina(){

    if(paginaJogos < Math.ceil(todosJogos.length / jogosPorPagina)){

        paginaJogos++;

        mostrarJogos();

    }

}



function paginaAnterior(){

    if(paginaJogos > 1){

        paginaJogos--;

        mostrarJogos();

    }

}


carregarTabela();

carregarJogos();
