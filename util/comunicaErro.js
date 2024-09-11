const Atendimento = require('../aws/schema')

async function comunicaErro(agendamento, mensagem) {
    agendamento.situacao = 'ERRO'
    agendamento.erros.push(mensagem)
    
    await Atendimento.delete(agendamento.id)
    await new Atendimento(agendamento).save()

    console.error('Erro cadastramento!')
    
}

module.exports = comunicaErro