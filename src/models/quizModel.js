var database = require("../database/config")

function salvarResultado(idUsuario, casa) {
    console.log("ACESSEI O QUIZ MODEL - salvarResultado():", idUsuario, casa);

    var instrucaoSql = `
        INSERT INTO quiz_resultado (id_usuario, casa) VALUES (${idUsuario}, '${casa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterRanking() {
    console.log("ACESSEI O QUIZ MODEL - obterRanking()");

    var instrucaoSql = `
        SELECT casa, COUNT(*) as total FROM quiz_resultado GROUP BY casa ORDER BY total DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterResultadoUsuario(idUsuario) {
    console.log("ACESSEI O QUIZ MODEL - obterResultadoUsuario():", idUsuario);

    var instrucaoSql = `
        SELECT casa, data_resposta FROM quiz_resultado WHERE id_usuario = ${idUsuario} ORDER BY data_resposta DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarResultado,
    obterRanking,
    obterResultadoUsuario
};
