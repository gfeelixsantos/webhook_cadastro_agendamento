const Atendimento = require('../aws/schema')
const enviarEmail = require('../nodemailer/index')

async function comunicaErro(agendamento, mensagem) {
    agendamento.status = 'ERRO'
    agendamento.erros.push(mensagem)

    return agendamento
}

module.exports = comunicaErro