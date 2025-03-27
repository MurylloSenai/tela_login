document.addEventListener("DOMContentLoaded", loadQuestion);
// Seleciona os elementos necessários no DOM
const questao = document.getElementById("question"); // Exibe a questão
const opcoes = document.getElementById("options");  // Contêiner para as opções
const proxima = document.getElementById("submit");  // Botão para próxima pergunta

// Função para carregar uma pergunta aleatória
async function loadQuestion() {
    try {
        // Limpa o conteúdo das opções
        opcoes.innerHTML = "";

        // Faz a requisição para buscar uma pergunta aleatória
        const resposta = await fetch("http://localhost:3000/Bperguntas", {
            method: "POST", // POST porque a rota foi configurada como POST
        });

        // Verifica se a resposta é bem-sucedida
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar dados: ${resposta.status}`);
        }

        // Converte a resposta para JSON
        const [questaoAtual] = await resposta.json(); // A resposta é um array com 1 item

        // Exibe a questão no elemento `question`
        questao.innerText = questaoAtual.enunciado;

        // Adiciona as opções dinamicamente
        const opcoesHTML = `
            <button>${questaoAtual.opcao1}</button>
            <button>${questaoAtual.opcao2}</button>
            <button>${questaoAtual.opcao3}</button>
            <button>${questaoAtual.opcao4}</button>
        `;
        opcoes.innerHTML = opcoesHTML;

        // Adiciona evento aos botões para captura de resposta (opcional)
        const botoes = opcoes.querySelectorAll("button");
        botoes.forEach((botao, index) => {
            botao.onclick = () => handleOptionClick(index, questaoAtual.resposta);
        });

    } catch (error) {
        console.error("Erro ao carregar a questão:", error);
        questao.innerText = "Erro ao carregar a questão. Tente novamente.";
    }
}

// Função para lidar com o clique em uma opção
function handleOptionClick(index, respostaCorreta) {
    const opcoesTexto = ["opcao1", "opcao2", "opcao3", "opcao4"];
    const opcaoSelecionada = opcoesTexto[index];
    const mensagem = respostaCorreta === opcaoSelecionada
        ? "Resposta correta! 🎉"
        : "Resposta errada. 😞";
    alert(mensagem);
}

// Adiciona funcionalidade ao botão "Próximo"
proxima.addEventListener("click", loadQuestion);

// Carrega a primeira pergunta ao carregar a página
document.addEventListener("DOMContentLoaded", loadQuestion);



document.addEventListener("DOMContentLoaded", loadQuestion);

const questao = document.querySelector(".questao"); // Elemento onde o enunciado será exibido
const opcoes = document.querySelector(".opcoes"); // Elemento para as opções
const proxima = document.querySelector("#proximo"); // Botão "Próximo"

// Função para carregar uma pergunta aleatória
async function loadQuestion() {
    try {
        // Faz a requisição para buscar uma pergunta aleatória
        const resposta = await fetch("http://localhost:3000/Bperguntas", {
            method: "POST", // POST porque a rota foi configurada como POST
        });

        // Converte a resposta em JSON
        const questaoAtual = await resposta.json();

        // Atualiza o enunciado da questão
        questao.textContent = questaoAtual.enunciado;

        // Gera os botões com as opções
        opcoes.innerHTML = `
            <button>${questaoAtual.opcao1}</button>
            <button>${questaoAtual.opcao2}</button>
            <button>${questaoAtual.opcao3}</button>
            <button>${questaoAtual.opcao4}</button>
        `;
    } catch (error) {
        console.error("Erro ao carregar a questão:", error);
    }
}

// Adiciona funcionalidade ao botão "Próximo"
proxima.addEventListener("click", loadQuestion);
