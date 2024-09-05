const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.cmsocupacional.com.br",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "esocial@cmsocupacional.com.br",
    pass: "esocial@2021",
  },
});


async function enviarEmail(message) {

  const info = await transporter.sendMail({
    from: '"ESOCIAL" <esocial@cmsocupacional.com.br>', // sender address
    to: "felix.devx@gmail.com", // list of receivers
    subject: "❌ ERRO AGENDAMENTO", // Subject line
    text: "plain text", // plain text body
    html: `
      <h1>ERRO DE AGENDAMENTO ${new Date().toLocaleTimeString('pt-br')}</h1>
      <section>
        <code>${message}</code>
      </section>
    `, 
  });

}

module.exports = enviarEmail