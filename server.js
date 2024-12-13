const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const port = process.env.PORT || 10000

const app = express();
app.use(cors);
app.use(bodyParser.json());
app.options('*', cors());

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

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
