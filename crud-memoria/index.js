//Express: criando servidor!
//baixar express no terminal c o comando: npm i express

const express = require("express"); //importa o modulo express do node_modules

const app = express(); //cria o nosso objeto

const porta = 3000; //cons para salvar a porta

app.use(express.json()); //faz conversão do que recebe de requisição para json, javascript object notation

const filmes = [
  {
    id: 1,
    nome: "Capitao America",
    duracao: 160,
  },
  {
    id: 2,
    nome: "Capita Marvel",
    duracao: 200,
  },
  {
    id: 3,
    nome: "Matrix",
    duracao: 180,
  },
];

const getFilmesValidos = () => filmes.filter(Boolean);

const getFilmeById = id => getFilmesValidos().find(filme.id === id);

const getFilmeIndexById = id => getFilmesValidos().findIndex(filme => filme.id === id);



//CRUD - Create[POST] - Read[GET] - Update[PUT] - Delete[DELETE]

//get / - home
app.get("/", (req, res) => res.status(200).send({Saudacao : "Hello World Express"})); //

//get /filmes - Retornar lista de filmes
app.get("/filmes", (req, res) => {
  res.json({filmes} );
});

//get /filmes/{id} - Retornar lista de filmes pelo ID
app.get("/filmes/:idFilme", (req, res) => {
  const id = +req.params.idFilme;
  const filme = getFilmeById(id)

  !filme //se não existir filme
    ? res.status(404).send({error : "Filme não existe"}) //faça isso
    : res.json(filme); //se não faça isso
});

// POST - /filmes - Criar um novo filme
app.post("/filmes", (req, res) => {
  const filme = req.body;

  if (!filme || !filme.nome || !filme.duracao)
    res.status(400).send({error : 'Filme inválido'});

  const ultimoFilme =  filmes[filmes.length - 1]

  if (filmes.length) {
      filme.id = ultimoFilme.id + 1
      filmes.push(filme);
  }else {
      filme.id = 1;
      filmes.push(filme);
  }

  res.status(201).send({resp : "Filme inserido com sucesso!"});
});

// PUT(update) - /filmes/{id} - Altere um filme pelo ID
app.put("/filmes/:id", (req, res) => {
  const id = +req.params.id;

  //findIndex retorna o objeto dentro do array filmes, caso nao exista retorna -1
  const filmeIndex = getFilmeIndexById(id)

  //validacao para ver se filme existe no array
  if (filmeIndex < 0) {
    res.status(404).send({error : "Filme não encontrado."})
    return;
  }

  const novofilme = req.body;

  if (!novofilme || !novofilme.nome || !novofilme.duracao) {
    res.status(400).send({error : 'Filme inválido'});
    return;
  }

  const filme = getFilmeById(id)
  novofilme.id = filme.id

  filmes[filmeIndex] = novofilme
  
  res.send("Filme alterado com sucesso!");
});

// DELETE - /filmes/{id} - Apagar um filme pelo id
app.delete("/filmes/:id", (req, res) => {
  const id = +req.params.id;

  const filmeIndex = getFilmeIndexById(id)
  if (filmeIndex < 0) {
    res.status(404).send({error : "Filme não encontrado."})
    return;
  }

  filmes.splice(filmeIndex, 1);  //le, faz o update e delete

  res.send({message : "Filme apagado com sucesso!"});
});

// para não aparecer o null so usar

// res.send(series.filter(Boolean))

//a função listen do objeto app serve para ligar o nosso back ende ao servidor ou servir o nosso back end, com função de callback para mostrar a msg e deve estar sempre no final!! Recebe 2 paramentros, a porta e função, para principalmente
app.listen(porta, () => {
  console.log(`Servidor rodando em http:localhost:${porta}`);
});

// const http = require('http');

// http.createServer((req, res) => {
//     res.end("Hello world, Priscila");
// }).listen(3000);  //requisição e resposta

// console.log('Servidor rodando em http://localhost:3000');

// const calc = require("./calculadora"); //importa: modulo calculadora

// const prompt = require("prompt-sync")();

// console.log(`Olá, seja bem vindo a ${calc.nome}`);

// const n1 = +prompt("Primeiro número: ");
// const n2 = +prompt("Segundo número: ");
// console.log();

// console.log(`
// Qual operação você gostaria de fazer?
//     [1] - soma
//     [2] - subtração
//     [3] - multiplicação
//     [4] - divisão

// `);

// const opcao = +prompt("Sua escolha: ");

// // if (opcao === 1) {
// //     console.log(`${n1+n2} = ${calc.soma(n1,n2)}`)
// // } else if (opcao === 2) {
// //     console.log(`${n1-n2} = ${calc.sub(n1,n2)}`)
// // } else if (opcao === 3) {
// //     console.log(`${n1 x n2} = ${calc.mult(n1,n2)}`)
// // } else if (opcao === 4) {
// //     console.log(`${n1 / n2} = ${calc.div(n1,n2)}`)
// // } else {
// //     console.console.log(('Opçãp inválida!'));
// // }

// // if (opcao === 1) ? console.log(`${n1+n2} = ${calc.soma(n1,n2)}`) : (opcao === 2) ? console.log(`${n1-n2} = ${calc.sub(n1,n2)}`) : (opcao === 3) ? console.log(`${n1xn2} = ${calc.mult(n1,n2)}`) : (opcao === 4) ? console.log(`${n1/n2} = ${calc.div(n1,n2)}`)

// //console.log(calc.soma(3,3));

// opcao === 1
//   ? console.log(`${n1} + ${n2} = ${calc.soma(n1, n2)}`)
//   : opcao === 2
//   ? console.log(`${n1} - ${n2} = ${calc.sub(n1, n2)}`)
//   : opcao === 3
//   ? console.log(`${n1} * ${n2} = ${calc.mult(n1, n2)}`)
//   : opcao === 4
//   ? console.log(`${n1} * ${n2} / ${calc.div(n1, n2)}`)
//   : console.log("Opção inválida!");
