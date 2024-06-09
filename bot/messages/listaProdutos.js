const axios = require("axios")

const array = [];
const listarProdutos = async () => {
  try {
    const data = await fetch("http://localhost:3000/AlimentoseBebidas");
    const response = await data.json();
    array.push(response);
  } catch (error) {
    console.log(error);
  }
};

listarProdutos();
module.exports = array;
