const perguntas = [
    {
        text: "Qual é a sua maior qualidade?",
        options: [
            { text: "Bravura", casa_hogwarts: "Grifinória" },
            { text: "Sabedoria", casa_hogwarts: "Corvinal" },
            { text: "Lealdade", casa_hogwarts: "Lufa-Lufa" },
            { text: "Ambição", casa_hogwarts: "Sonserina" }
        ]
    },
    {
        text: "Como você prefere resolver um conflito?",
        options: [
            { text: "De forma direta e corajosa", casa_hogwarts: "Grifinória" },
            { text: "Analisando todos os ângulos", casa_hogwarts: "Corvinal" },
            { text: "Buscando a harmonia", casa_hogwarts: "Lufa-Lufa" },
            { text: "Usando estratégia", casa_hogwarts: "Sonserina" }
        ]
    },
    {
        text: "Qual ambiente você se sente mais confortável?",
        options: [
            { text: "Na multidão, sendo o centro das atenções", casa_hogwarts: "Grifinória" },
            { text: "Na biblioteca, estudando", casa_hogwarts: "Corvinal" },
            { text: "Em grupo, com amigos próximos", casa_hogwarts: "Lufa-Lufa" },
            { text: "Em um lugar de poder e influência", casa_hogwarts: "Sonserina" }
        ]
    },
    {
        text: "Como você reage sob pressão?",
        options: [
            { text: "Fico determinado e corajoso", casa_hogwarts: "Grifinória" },
            { text: "Penso racionalmente", casa_hogwarts: "Corvinal" },
            { text: "Busco apoio nos outros", casa_hogwarts: "Lufa-Lufa" },
            { text: "Faço o que é necessário para vencer", casa_hogwarts: "Sonserina" }
        ]
    },
    {
        text: "O que é mais importante para você?",
        options: [
            { text: "Coragem e honra", casa_hogwarts: "Grifinória" },
            { text: "Conhecimento e inteligência", casa_hogwarts: "Corvinal" },
            { text: "Amizade e trabalho em equipe", casa_hogwarts: "Lufa-Lufa" },
            { text: "Sucesso e poder", casa_hogwarts: "Sonserina" }
        ]
    },
    {
        text: "Qual é seu tipo de hobby favorito?",
        options: [
            { text: "Esportes radicais e competições", casa_hogwarts: "Grifinória" },
            { text: "Leitura e pesquisa", casa_hogwarts: "Corvinal" },
            { text: "Jogos em grupo e atividades sociais", casa_hogwarts: "Lufa-Lufa" },
            { text: "Empreendimentos e projetos ambiciosos", casa_hogwarts: "Sonserina" }
        ]
    },
    {
        text: "Como você se vê daqui a 10 anos?",
        options: [
            { text: "Um líder respeitado", casa_hogwarts: "Grifinória" },
            { text: "Um especialista em meu campo", casa_hogwarts: "Corvinal" },
            { text: "Cercado de amigos leais", casa_hogwarts: "Lufa-Lufa" },
            { text: "No topo da minha carreira", casa_hogwarts: "Sonserina" }
        ]
    },
    {
        text: "O que você mais valores nos outros?",
        options: [
            { text: "Coragem e determinação", casa_hogwarts: "Grifinória" },
            { text: "Inteligência e criatividade", casa_hogwarts: "Corvinal" },
            { text: "Lealdade e confiabilidade", casa_hogwarts: "Lufa-Lufa" },
            { text: "Ambição e eficiência", casa_hogwarts: "Sonserina" }
        ]
    }
];

const casasDescriptions = {
    "Grifinória": {
        icon: "",
        description: "Casa da bravura, coragem e determinação!",
        info: "Grifórios são conhecidos por sua coragem, liderança natural e espírito competitivo. Você é corajoso, valoriza a honra e não teme desafios."
    },
    "Corvinal": {
        icon: "",
        description: "Casa da sabedoria, inteligência e criatividade!",
        info: "Corvinais são valorizam o conhecimento, inteligência e criatividade. Você é pensador, observador e sempre busca aprender mais."
    },
    "Lufa-Lufa": {
        icon: "",
        description: "Casa da lealdade, dedicação e união!",
        info: "Lufa-Lufas são leais, confiáveis e valorizam a amizade. Você é dedicado, trabalha bem em equipe e nutre amizades duradouras."
    },
    "Sonserina": {
        icon: "",
        description: "Casa da ambição, astúcia e poder!",
        info: "Sonserianos são ambiciosos, estratégicos e determinados. Você é astuto, tem visão clara de seus objetivos e fará o necessário para alcançá-los."
    }
};

let perguntaAtual = 0;
let respostas = {};
let idUsuario = null;

function init() {
    // Obter ID do usuário da sessão
    idUsuario = sessionStorage.ID_USUARIO;
    if (!idUsuario) {
        alert('Você precisa estar logado para responder o quiz!');
        window.location.href = '../login.html';
        return;
    }
    showquestao();
}

function showquestao() {
    const questao = perguntas[perguntaAtual];
    const totalperguntas = perguntas.length;
    const progresso = ((perguntaAtual + 1) / totalperguntas) * 100;

    document.getElementById('barraProgressao').style.width = progresso + '%';
    document.getElementById('numeroQuestao').textContent = `Pergunta ${perguntaAtual + 1} de ${totalperguntas}`;
    document.getElementById('textoQuestao').textContent = questao.text;

    console.log('showquestao', { perguntaAtual, questao });

    const containerOpcoes = document.getElementById('containerOpcoes');
    containerOpcoes.innerHTML = '';

    questao.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'option-label';
        label.innerHTML = `
            <input type="radio" name="answer" value="${option.casa_hogwarts}" 
                ${respostas[perguntaAtual] === option.casa_hogwarts ? 'checked' : ''}>
            <span>${option.text}</span>
        `;
        label.addEventListener('change', function () {
            respostas[perguntaAtual] = this.querySelector('input').value;
            document.getElementById('botaoProximo').disabled = false;
        });
        containerOpcoes.appendChild(label);
    });

    // Se já tem resposta, habilitar botão
    if (respostas[perguntaAtual]) {
        document.getElementById('botaoProximo').disabled = false;
    } else {
        document.getElementById('botaoProximo').disabled = true;
    }

    // Mostrar/esconder botão anterior
    document.getElementById('botaoAnterior').style.display = perguntaAtual === 0 ? 'none' : 'block';

    // Mudar texto do botão próximo
    const botaoProximo = document.getElementById('botaoProximo');
    if (perguntaAtual === totalperguntas - 1) {
        botaoProximo.textContent = 'Finalizar Quiz! →';
    } else {
        botaoProximo.textContent = 'Próxima →';
    }
}

function nextquestao() {
    if (!respostas[perguntaAtual]) {
        alert('Selecione uma opção para continuar!');
        return;
    }

    if (perguntaAtual < perguntas.length - 1) {
        perguntaAtual++;
        showquestao();
    } else {
        finishQuiz();
    }
}

function previousquestao() {
    if (perguntaAtual > 0) {
        perguntaAtual--;
        showquestao();
    }
}

function finishQuiz() {
    // Calcular a casa vencedora
    const contagemCasas = {};
    Object.values(respostas).forEach(casa_hogwarts => {
        contagemCasas[casa_hogwarts] = (contagemCasas[casa_hogwarts] || 0) + 1;
    });

    let winnercasa_hogwarts = Object.keys(contagemCasas).reduce((a, b) =>
        contagemCasas[a] > contagemCasas[b] ? a : b
    );

    // Salvar no banco de dados
    saveResult(winnercasa_hogwarts);
}

function saveResult(casa_hogwarts) {
    document.getElementById('containerQuiz').style.display = 'none';
    document.getElementById('containerCarregando').classList.add('show');

    fetch('/quiz/salvar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            casa: casa_hogwarts
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('containerCarregando').classList.remove('show');
            showResult(casa_hogwarts);
        })
        .catch(error => {
            console.error('Erro ao salvar resultado:', error);
            alert('Erro ao salvar seu resultado!');
            document.getElementById('containerCarregando').classList.remove('show');
            document.getElementById('containerQuiz').style.display = 'block';
        });
}

function showResult(casa_hogwarts) {
    const casa_hogwartsInfo = casasDescriptions[casa_hogwarts];
    document.getElementById('iconeCasa').textContent = casa_hogwartsInfo.icon;
    document.getElementById('nomeCasa').textContent = casa_hogwarts;
    document.getElementById('descricaoCasa').textContent = casa_hogwartsInfo.description;
    document.getElementById('infoCasa').textContent = casa_hogwartsInfo.info;
    document.getElementById('containerResultado').classList.add('show');
}

function restartQuiz() {
    perguntaAtual = 0;
    respostas = {};
    document.getElementById('containerResultado').classList.remove('show');
    document.getElementById('containerQuiz').style.display = 'block';
    showquestao();
}

// Inicializar o quiz quando a página carrega
window.addEventListener('load', function () {
    validarSessao();
    init();
});