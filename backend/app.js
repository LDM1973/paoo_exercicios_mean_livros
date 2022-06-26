const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

const Livro = require('./models/livro');

mongoose.connect('mongodb+srv://<angular>:<1234>@cluster0.kepim.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log ("Conexão OK")
  }).catch(() => {
    console.log("Conexão NOK")
  });

app.use (bodyParser.json());

const livros = [
  {
    id: '1',
    titulo: 'Blade Runner',
    autor: 'Philip K Dick',
    numeroPaginas: '250'
  },
  {
    id: '2',
    titulo: '1984',
    autor: 'George Orwell',
    numeroPaginas: '380'
  }
]

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

  next();
});

app.get('/api/livros', (req, res, next) => {
  Livro.find().then(documents => {
  console.log (documents)
  res.status(200).json({
    mensagem: "Tudo OK",
    livros: documents
    });
  })
});

app.post ('/api/livros', (req, res, next) => {
  const livro = new Livro({
    id: req.body.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    numeroPaginas: req.body.numeroPaginas
  })
  livro.save();
  then (livroInserido => {
    res.status(201).json({
    mensagem: 'Livro inserido',
    id: livroInserido._id
    })
  })
});

app.use('/api/livros',(req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    livros: livros
  });
});

app.delete ('/api/livros/:id', (req, res, next) => {
  Livro.deleteOne ({_id: req.params.id}).then((resultado) => {
    console.log (resultado);
    res.status(200).json({mensagem: "Livro removido"})
    });
});

module.exports = app;
