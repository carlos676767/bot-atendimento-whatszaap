const { MongoClient } = require("mongodb");
const url = "mongodb+srv://admin:admin1234@dados.7d94myt.mongodb.net/";
const novaConexao = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataBaseName = "produtos";
const connectDataBase = async () => {
  try {
    await novaConexao.connect();
    const db = novaConexao.db(dataBaseName);
    console.log("database connect");
    return db
  } catch (error) {
    console.error(`Database error connect from mongodb`);
  }
};

const newDadosDataBase = async (produto, valor) => {
  try {
    const database = await connectDataBase()
    const collection = await database.collection("produtos");
    await collection.insertOne({ produto: produto, valor: valor});
  } catch (error) {
    console.error("Datababase impossible itens add")
  }
};


module.exports = {newDadosDataBase}
