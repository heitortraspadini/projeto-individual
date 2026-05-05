var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/salvar", function (req, res) {
    quizController.salvarResultado(req, res);
});

router.get("/ranking", function (req, res) {
    quizController.obterRanking(req, res);
});

router.get("/resultado/:idUsuario", function (req, res) {
    quizController.obterResultadoUsuario(req, res);
});

module.exports = router;
