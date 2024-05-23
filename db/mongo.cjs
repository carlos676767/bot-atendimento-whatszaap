const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const novaConexao = new MongoClient(url);
const dataBaseName = "produtos";
const dados = require("../backend/api.cjs")
const abrirBancoDeDados = async () => {
  try {
    await novaConexao.connect();
    console.log("database conectada");
    const db = novaConexao.db(dataBaseName);
    const collection = db.collection("produtos");
    await collection.insertOne(dados);
    console.log(collection);
  } catch (error) {
    console.log(error);
  }
};

abrirBancoDeDados();
