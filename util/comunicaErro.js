const Atendimento = require('../aws/schema')
const enviarEmail = require('../nodemailer/index')

async function comunicaErro(agendamento, mensagem) {
    agendamento.situacao = 'ERRO'
    agendamento.erros = []
    agendamento.erros.unshift(mensagem)
    
    Atendimento.delete(agendamento.id)
    await new Atendimento(agendamento).save()

    await enviarEmail(agendamento)
    throw new Error(agendamento);
}

module.exports = comunicaErro