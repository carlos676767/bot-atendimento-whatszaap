const { MongoClient } = require("mongodb");
const dadosFront = require("../backend/api.cjs");
const url = "mongodb://127.0.0.1:8080";
const novaConexao = new MongoClient(url);
const dataBaseName = "produtos";

const abrirBancoDeDados = async () => {
  try {
    await novaConexao.connect();
    console.log("database conectada");
    const db = novaConexao.db(dataBaseName);
    const collection = db.collection("produtos");
    await collection.insertMany(dadosFront);
    console.log(collection);
  } catch (error) {
    console.log(error);
  };
};

abrirBancoDeDados();
