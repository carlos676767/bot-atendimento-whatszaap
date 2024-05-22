const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");

const enviarDadosApi = async () => {
  if (inputVaio(productName.value, productPrice.value)) {
    return;
  } else {
    const dadosProduto = {
      nomeProduto: productName.value,
      valorProduto: productPrice.value,
    };
    try {
      const data = await fetch("http://localhost:8001/produtos", {
        method: "POST",
        body: JSON.stringify(dadosProduto),
      });
      const response = await data.json();
      console.log(response);
      mensagemCadastro();
    } catch (error) {
      console.log(error);
    }
  }
};

const mensagemCadastro = () => {
  Swal.fire({
    title: "Produto Cadastrado!",
    text: "O produto foi cadastrado com sucesso.",
    icon: "success",
  });
};

const inputVaio = (nomeProduto, precoProduto) => {
  return nomeProduto.trim() === "" && precoProduto.trim() === "";
};

const botaoCadastrar = document.querySelector(".botaoCadastrar");
botaoCadastrar.addEventListener("click", () => {
  enviarDadosApi();
});
