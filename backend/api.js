const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const dataBase = require("../db/mongo");
api.use(bodyParser.json());

api.post("/", async (req, resposta) => {
  try {
    const reqOk = req.body;
    await dataBase(reqOk.nomeProduto, reqOk.valorProduto);
    resposta.send({ status: "OK", msg: "produto cadatsrado" });
  } catch (error) {
    resposta.status(500).send({ error: "Internal Server Error", status: 500 });
  }
});


const port = 9047;
api.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
