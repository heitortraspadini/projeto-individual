var quizModel = require("../models/quizModel");

function normalizarCasa(casa) {
    if (!casa) {
        return casa;
    }

    var casaNormalizada = casa.toString().trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (casaNormalizada === "griforia" || casaNormalizada === "grifinoria") {
        return "Grifinória";
    }

    if (casaNormalizada === "corvinal") {
        return "Corvinal";
    }

    if (casaNormalizada === "lufa-lufa") {
        return "Lufa-Lufa";
    }

    if (casaNormalizada === "sonserina") {
        return "Sonserina";
    }

    return casa;
}

function agruparRankingNormalizado(resultado) {
    var rankingAgrupado = {};

    resultado.forEach(function (item) {
        var casaNormalizada = normalizarCasa(item.casa);

        if (!rankingAgrupado[casaNormalizada]) {
            rankingAgrupado[casaNormalizada] = 0;
        }

        rankingAgrupado[casaNormalizada] += Number(item.total);
    });

    return Object.keys(rankingAgrupado)
        .map(function (casa) {
            return {
                casa: casa,
                total: rankingAgrupado[casa]
            };
        })
        .sort(function (a, b) {
            return b.total - a.total;
        });
}

function salvarResultado(req, res) {
    var idUsuario = req.body.idUsuario;
    var casa = req.body.casa;

    if (idUsuario == undefined) {
        res.status(400).send({ erro: true, mensagem: 'id_usuario está undefined' });
    } else if (casa == undefined) {
        res.status(400).send({ erro: true, mensagem: 'casa está undefined' });
    } else {
        quizModel.salvarResultado(idUsuario, normalizarCasa(casa))
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(`\nHouve um erro ao realizar o cadastro! Erro: ${erro.sqlMessage}\n`);
                    res.status(500).json({ erro: erro.sqlMessage });
                }
            );
    }
}

function obterRanking(req, res) {
    quizModel.obterRanking()
        .then(
            function (resultado) {
                res.json(agruparRankingNormalizado(resultado));
            }
        ).catch(
            function (erro) {
                console.log(`\nHouve um erro ao obter o ranking! Erro: ${erro.sqlMessage}\n`);
                res.status(500).json({ erro: erro.sqlMessage });
            }
        );
}

function obterResultadoUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send({ erro: true, mensagem: 'id_usuario está undefined' });
    } else {
        quizModel.obterResultadoUsuario(idUsuario)
            .then(
                function (resultado) {
                    resultado.forEach(function (item) {
                        item.casa = normalizarCasa(item.casa);
                    });
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(`\nHouve um erro ao obter resultado do usuário! Erro: ${erro.sqlMessage}\n`);
                    res.status(500).json({ erro: erro.sqlMessage });
                }
            );
    }
}

module.exports = {
    salvarResultado,
    obterRanking,
    obterResultadoUsuario
};
