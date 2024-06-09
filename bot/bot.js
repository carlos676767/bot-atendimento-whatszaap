const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const listaProdutos = require("./messages/listaProdutos");
const horarioFuncionamento = require("./messages/horariosFuncionamento.js");
const locacaliao = require("./messages/localizao.js");
const faq = require("./messages/duvidas.js");
const contatos = require("./messages/contatos.js");
const infoEntregas = require("./messages/entregas.js");
const sugestoes = require("./messages/sugestoes.js");
const qrcode = require("qrcode-terminal");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.WHATSAPP_API_GEMINI);
const creditos = require("./messages/creditos.js");
const adm = require("./messages/admin/admin.cjs");
const msgProduto = require("./messages/admin/msgAddProduto");
const { newDadosDataBase, cleanDatabase } = require("../db/mongo.js");
const client = new Client({
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.on("ready", () => {
  console.log("bot online!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

const menuInicial = () => {
  client.on("message", (msg) => {
    const menu = `*🤖 Olá! Eu sou o bot supermercado popular, aqui para ajudar a tirar todas as suas dúvidas e facilitar suas compras. Como posso ajudar você hoje?*
    *1. 🛒 Lista de Produtos*
    *2. 📉 Produtos em Promoção*
    *3. 🕒 Horário de Funcionamento*
    *4. 📍  Localização*
    *5. 📞 Contatos*
    *6. ❓  Dúvidas Frequentes*
    *7. 🚚 Serviço de Entrega*
    *8. 📢 Reclamações e Sugestões*
    *9. 🍳Receitas e Dicas de Cozinha*
    *10. 🙍🏻 Para falar com atendimento digite atendimento.*
    *11.👨‍💻 Digite creditos para ver os creditos*
    *Desejamos boas compras! Se precisar de qualquer outra coisa, estou aqui para ajudar!*`;

    if (msg.body === "oi" || msg.body === "Oi") {
      const mensagem = msg.from.replace(/@\w+\.us/g, "");
      enviarNumeroAtendimento(mensagem);
      msg.reply(menu);
    }
  });
};

const enviarNumeroAtendimento = (numero) => {
  client.once("message", (mensagem) => {
    if (mensagem.body === "atendimento" || mensagem.body === "Atendimento") {
      mensagem.reply(
        "Por favor, aguarde um momento enquanto encaminho sua solicitação 🔄✨"
      );
      mensagem.reply(
        "Caso queira fazer uma nova solicitação, use a palavra-chave `oi` para reabrir o menu 🔄✨."
      );
      client.sendMessage(
        `${process.env.WHATSAPP_NUMERO_DONO}`,
        `O numero ${numero} deseja atendimento😊📱🔧`
      );
    }
  });
};

const mensagemOpcao = (msg) => {
  const opcoes = `*Selecione uma das opcoes das para*\n *visualizar nossos produtos 😊*
  10. 🧀 Frios e Laticínios
  11.🥩 Carnes
  12.🥕 Hortifruti 
  13.🍞 Padaria 
  14.🥤 Bebidas 
  15.🥫 Enlatados e Conservas
  16.🌾 Cereais e Grãos
  17.🍝 Massas`;
  msg.reply(opcoes);
};

const opcoes = async () => {
  client.on("message", (msg) => {
    if (msg.body === "1") {
      mensagemOpcao(msg);
      return;
    }
    if (msg.body >= "10" && msg.body <= "17") {
      const opcoes = {
        10: "FrioseLticínios",
        11: "Carnes",
        12: "Hortifruti",
        13: "Padaria",
        14: "Bebidas",
        15: "EnlatadoseConservas",
        16: "CereaiseGrãos",
        17: "Massas",
      };
      const options = opcoes[msg.body];
      const produtos = buscarProdutos(options);
      msg.reply(
        `*MP - Confira ja nossos valores*\n ${produtos} \n\n Gostou de alguma oferta ? venha nos visitar,\n\n ${locacaliao} `
      );
    }
  });
};

const buscarProdutos = (categoria) => {
  let juntarValores = "";
  listaProdutos.AlimentoseBebidas[categoria].map((arr) => {
    const { emoji, nome, valor } = arr;
    juntarValores += `\n${emoji} ${nome} - ${valor}`;
  });
  return juntarValores;
};

const diasDefuncionamento = () => {
  client.on("message", (msg) => {
    if (msg.body === "3") {
      msg.reply(horarioFuncionamento);
    }
  });
};

const enderecoMercado = () => {
  client.on("message", (msg) => {
    if (msg.body === "4") {
      msg.reply(locacaliao);
    }
  });
};

const contato = () => {
  client.on("message", (msg) => {
    if (msg.body === "5") {
      msg.reply(contatos);
    }
  });
};

const faqPerguntas = () => {
  client.on("message", (msg) => {
    if (msg.body === "6") {
      msg.reply(faq);
    }
  });
};

const servicosDeEntrega = () => {
  client.on("message", (msg) => {
    if (msg.body === "7") {
      msg.reply(infoEntregas[0]);
    }
  });
};

const sugestions = () => {
  client.on("message", (msg) => {
    if (msg.body === "8") {
      msg.reply(sugestoes);
    }
  });
};

let text = "";
async function obterReceitas(valor) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `com base nos ingredientes gere uma receita ${valor}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    text = response.text();
  } catch (error) {
    text = "😔📭 Desculpe, não foi possível obter as receitas no momento. 🍽️🔄";
  }
}

const trazerReceitas = (msg) => {
  msg.reply("🍳 Digite ingredientes para gerar sua receita: 🥦🍗🍅");
  client.once("message", async (mensagem) => {
    const receita = mensagem.body.split(",");
    mensagem.reply(
      "⏳🍲 Aguarde, estamos buscando receitas em nosso banco de dados... 🍴🔍"
    );
    await obterReceitas(receita);
    mensagem.reply(text);
  });
};

const exibirReceitas = () => {
  client.on("message", (msg) => {
    if (msg.body === "9") {
      trazerReceitas(msg);
    }
  });
};

const creditosBot = () => {
  client.on("message", (msg) => {
    if (msg.body === "creditos") {
      msg.reply(creditos);
    }
  });
};

const menuAdmin = () => {
  client.on("message", (msg) => {
    if (msg.body == process.env.SENHAADMIN) {
      msg.reply(adm);
      client.once("message", async (message) => {
        if (message.body.includes("add")) {
          await addDadosDatabase(message);
          return;
        }
        if (message.body.includes("clean")) {
          await cleanDatabase(message);
          return;
        }
      });
    }
  });
};

async function addDadosDatabase(message) {
  const pegarMnesagem = await message.getChat();
  const { body } = pegarMnesagem.lastMessage;
  const novaStr = body.slice(4, Infinity).split(" ");
  console.log(novaStr);
  await newDadosDataBase(novaStr[0], novaStr[1]);
  message.reply(msgProduto(novaStr[0], novaStr[1]));

}

menuInicial();
opcoes();
diasDefuncionamento();
enderecoMercado();
faqPerguntas();
contato();
servicosDeEntrega();
sugestions();
exibirReceitas();
creditosBot();
menuAdmin();
client.initialize();
