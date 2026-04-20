const imagens = [
    "./assets/imgs/grifinoria.png",
    "./assets/imgs/corvinal.png",
    "./assets/imgs/lufalufa.png",
    "./assets/imgs/sonserina.png"
];

const descricoes = [
    "Fundada por Godric Gryffindor, a casa preza pela coragem, bravura e determinação. Seus membros são conhecidos por sua ousadia e cavalheirismo em face do perigo ou para ajudar os outros.",
    "Fundada por Rowena Ravenclaw, a casa preza pela sabedoria, inteligência e criatividade. Seus membros são conhecidos por sua curiosidade, perspicácia e pela busca constante pelo aprendizado.",
    "Fundada por Helga Hufflepuff, a casa preza pelo trabalho árduo e lealdade. Seus membros são conhecidos por sua natureza justa e uma dedicação inabalável aos seus amigos e princípios.",
    "Fundada por Salazar Slytherin, a casa preza pela ambição e astúcia. Seus membros são conhecidos por seu forte instinto de preservação e determinação para alcançar seus objetivos e o sucesso."
];

const titulos = [
    "Grifinória",
    "Corvinal",
    "Lufa-Lufa",
    "Sonserina"
]

const cores = [
    "linear-gradient(135deg, #740001 0%, #4a0001 100%)",
    "linear-gradient(135deg, #001881 0%, #000547 100%)",
    "linear-gradient(135deg, #918700 0%, #6e6d00 100%)",
    "linear-gradient(135deg, #268500 0%, #094a00 100%)"
]

const bordas = [
    "3px solid rgba(116, 0, 1, 0.3)",
    "3px solid rgba(0, 2, 116, 0.3)",
    "3px solid rgba(116, 114, 0, 0.3)",
    "3px solid rgba(4, 116, 0, 0.3)"
]

let qualCard = 0;

function atualizarCard() {
    document.getElementById('img_casa').src = imagens[qualCard]
    document.getElementById('desc_casa').innerHTML = descricoes[qualCard]
    document.getElementById('titulo_casa').innerHTML = titulos[qualCard]
    document.getElementById('img_casas_wrapper').style.background = cores[qualCard]
    document.getElementById('card-casas-wrapper').style.border = bordas[qualCard]
}

function voltar_carrossel() {
    if (qualCard <= 0) {
        qualCard = imagens.length - 1; // Vai para a última
    } else {
        qualCard--;
    }
    atualizarCard();
}

function seguir_carrossel() {
    if (qualCard >= imagens.length - 1) {
        qualCard = 0;
    } else {
        qualCard++;
    }
    atualizarCard();
}