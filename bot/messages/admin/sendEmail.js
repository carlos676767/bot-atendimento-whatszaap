const nodemailer = require("nodemailer");
const fs = require("fs");
const generator = require("generate-password");
const html = require("./templateEmail");
require("dotenv").config();

const gerarSenha = (callback) => {
  const credenciais = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: "carlitobr730@yahoo.com",
      pass: "xqljvfiirpoeqceq",
    },
  });

  const password = generator.generate({
    length: 30,
    uppercase: true,
    excludeSimilarCharacters: true,
    symbols: true,
  });

  fs.writeFileSync("email.html", html(password));
  fs.readFile("./email.html", (err, sucess) => {
    if (err) {
      console.log(err);
      return;
    }

    const data = sucess;
    const option = {
      from: "carlitobr730@yahoo.com",
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

  callback(password);
  setInterval(() => {
    const credenciais = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: "carlitobr730@yahoo.com",
        pass: "xqljvfiirpoeqceq",
      },
    });

    const password = generator.generate({
      length: 30,
      uppercase: true,
      excludeSimilarCharacters: true,
      symbols: true,
    });

    fs.writeFileSync("email.html", html(password));
    fs.readFile("./email.html", (err, sucess) => {
      if (err) {
        console.log(err);
        return;
      }

      const data = sucess;
      const option = {
        from: "carlitobr730@yahoo.com",
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

    callback(password);
  }, 3600000);
};

module.exports = gerarSenha;
