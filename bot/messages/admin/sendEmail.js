const nodemailer = require("nodemailer");
const fs = require("fs");
const generator = require("generate-password");
const html = require("./templateEmail");
require("dotenv").config();

const password = generator.generate({
  length: 30,
  uppercase: true,
  excludeSimilarCharacters: true,
  symbols: true,
});
fs.writeFileSync("email.html", html(password));

const credenciais = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: process.env.EMAIL,
    pass: "xqljvfiirpoeqceq",
  },
});

fs.readFile("./email.html", (err, sucess) => {
  if (err) {
    console.log(err);
    return;
  }
  const data = sucess;
  const option = {
    from: process.env.EMAIL,
    to: "s98059583@gmail.com",
    subject: "Informações de Acesso ao Bot",
    html: data,
  };

  credenciais.sendMail(option, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
});
