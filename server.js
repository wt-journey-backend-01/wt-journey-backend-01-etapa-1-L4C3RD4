const express = require('express')
const lanches = require('./public/data/lanches.json');

const app = express();
const PORT = 3000;
app.use(express.static('public'));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/views/index.html');
});
app.get('/contato',(req,res)=>{
res.sendFile(__dirname+'/views/contato.html');
});
app.get('/sugestao', (req, res) => {
  const nome = req.query.nome || 'Cliente';
  const ingredientes = req.query.ingredientes || 'não informado';

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>Pedido recebido</title>
      <style>
      .form-holder{
    margin-top: 5% !important;
    margin: auto;
    max-width: 25%;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    text-align: center;
    
}
    .form-holder a{
      text-decoration:none;
    }
        body {
          
          background: #EAEAEA;
          padding: 2rem;
          text-align: center;
        }
        h1 { color: red }
        
      </style>
    </head>
    <body>
    <div class="form-holder">
      <h1>Obrigado, ${nome}!</h1>
      <p>Recebemos seu pedido</p>
      <p> ingredientes:</p>
      <p><strong>${ingredientes}</strong></p>
      <a href="/">Voltar à página inicial</a>
      </div>
    </body>
    </html>
  `);
});
app.use(express.urlencoded({ extended: true }));

app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Mensagem Recebida</title>
      <style>
      .form-holder{
    margin-top: 5% !important;
    margin: auto;
    max-width: 25%;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    text-align: center;
    
}
    .form-holder a{
      text-decoration:none;
    }
        body {  background: #EAEAEA; padding: 2rem; text-align: center; }
        h1 { color: red; }
        p { font-size: 1.1rem; }
      </style>
    </head>
    <body>
    <div class="form-holder">
      <h1>Mensagem Recebida!</h1>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Assunto:</strong> ${assunto}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${mensagem}</p>
      <a href="/">Voltar para a página inicial</a>
      </div>
    </body>
    </html>
  `);
});
app.get('/api/lanches', (req, res) => {
  res.status(200).json(lanches);
});
app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});