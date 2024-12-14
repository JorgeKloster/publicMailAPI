const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  
  // Configure o transporter do nodemailer com suas credenciais de e-mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seu_gmail@gmail.com',
      pass: 'sua_senha_de_app_do_gmail' //importante que seja "senha de app" do gmail
    }
  });

  const mailOptions = {
    from: email,
    to: 'email_destino',
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

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
