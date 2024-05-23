const fast = require("fastify")({ logger: true });

const dadosFrontEnd = [];
fast.post("/produtos", function dados(requst, msg) {
  msg.send({ sucesso: "dados enviados com sucesso" });
  dadosFrontEnd.push(requst.body);
  console.log(dadosFrontEnd);
});

module.exports = dadosFrontEnd
fast.listen({ port: 5000 }, (err) => {
  if (err) {
    fast.log.error(err);
    process.exit(1);
  }
});
