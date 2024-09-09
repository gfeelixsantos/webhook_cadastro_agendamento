const Atendimento = require('../aws/schema')
const enviarEmail = require('../nodemailer/index')

async function comunicaErro(agendamento, mensagem) {
    agendamento.status = 'ERRO'
    agendamento.erros.push(mensagem)
    
    await Atendimento.delete(agendamento.id)
    await new Atendimento(agendamento).save()

    enviarEmail(agendamento)

    throw new Error(mensagem, 'Erro ao cadastrar')
}

module.exports = comunicaErro