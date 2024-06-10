const { MongoClient } = require("mongodb");
const mensagemDadosApagados = require("../bot/messages/admin/mensagemCleanBase");
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
    return db;
  } catch (error) {
    console.error(`Database error connect from mongodb`);
  }
};

const newDadosDataBase = async (produto, valor) => {
  try {
    const database = await connectDataBase();
    const collection = await database.collection("produtos");
    await collection.insertOne({ produto: produto, valor: valor });
  } catch (error) {
    console.error("DataBase impossible itens add");
  }
};

const cleanDatabase = async (msg) => {
  try {
    const database = await connectDataBase();
    const collectionDrop = await database.collection("produtos").drop();
    console.log("delete sucess database itens");
    msg.reply(mensagemDadosApagados);
    return msg;
  } catch (error) {
    console.error("error delete database");
  }
};

const searchItensDatabase = async (msg) => {
  try {
    const database = await connectDataBase();
    const collectionFind = await database.collection("produtos").find().toArray();
    let armazenarDados = "";
    collectionFind.forEach((data) => {
      const { produto, valor } = data;
      armazenarDados += `\n🛍️ Valor: ${valor} 💰Preco: ${produto}`;
    });
    msg.reply(armazenarDados);
    return msg;
  } catch (error) {
    console.error("error search database");
  }
};

const updateItens = async (nome, preco) => {
  try {
    const databaseConnect = await connectDataBase()
    const collection = await databaseConnect.collection("produtos")
    const filterItens = await collection.updateOne({ produto: nome }, { $set: { valor: preco  } })
    console.log(filterItens)
  } catch (error) {
    console.log(error);
  }
};



module.exports = { newDadosDataBase, cleanDatabase, searchItensDatabase, updateItens };
