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


async function enviarEmail(agendamento) {

  const info = await transporter.sendMail({
    from: '"ESOCIAL" <esocial@cmsocupacional.com.br>', // sender address
    to: "felix.devx@gmail.com", // list of receivers
    subject: `❌ ERRO DE AGENDAMENTO ${agendamento.id}`, // Subject line
    text: "plain text", // plain text body
    attachments: [
      {
          filename: 'agendamento.json',
          content: JSON.stringify(agendamento)
      }
  ],
    html: 
    `
      <h2>${agendamento.funcionario}</h2>
      <h3>${agendamento.empresa}</h3>
      <h3>${agendamento.tipoExame}</h3>
      <h3>${agendamento.dataAgendamento} - ${agendamento.horarioAgendamento}</h3>
      <strong>${agendamento.erros}</strong>
    `, 
  });

}

module.exports = enviarEmail