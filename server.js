const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const port = process.env.PORT || 3000

const app = express();
app.use(cors);
app.use(bodyParser.json());

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Configure o transporter do nodemailer com suas credenciais de e-mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'georgenes1999@gmail.com',
      pass: 'gxhk gacr dlta sujk'
    }
  });

  const mailOptions = {
    from: email,
    to: 'jfk@kwaut.com',
    subject: `Contato do site de ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    console.log("Email enviado:", info)
    res.status(200).send("Mensagem enviada com sucesso!");
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
