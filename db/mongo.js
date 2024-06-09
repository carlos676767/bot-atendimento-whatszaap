const { MongoClient } = require("mongodb");
const url = "mongodb+srv://admin:admin1234@dados.7d94myt.mongodb.net/";
const novaConexao = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dataBaseName = "produtos";

const abrirBancoDeDados = async (produto, valor) => {
  try {
    await novaConexao.connect();
    console.log("database conectada");
    const db = novaConexao.db(dataBaseName);
    const collection = db.collection("produtos");
   await collection.insertOne({produto: produto, valor: valor})
    console.log("connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = abrirBancoDeDados
