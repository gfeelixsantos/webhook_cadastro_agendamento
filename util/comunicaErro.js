const Atendimento = require('../aws/schema')

async function comunicaErro(agendamento, mensagem) {
    agendamento.situacao = 'ERRO'
    agendamento.erros.push(mensagem)
    
    await Atendimento.delete(agendamento.id)
    await new Atendimento(agendamento).save()

    // Envia email caso houver erros
    if (agendamento.erros.length > 0){
        enviarEmail(agendamento)
    }

    console.error('Erro cadastramento!')
    
}

module.exports = comunicaErro