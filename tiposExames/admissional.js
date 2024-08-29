const cadastroEmpresas = require('../soc/exportaDados/cadastroEmpresas')

async function exameAdmissional(agendamento) {
    try {
        // Busca empresa SOC
        agendamento = await cadastroEmpresas(agendamento)






        
        return agendamento
    } catch (error) {
        console.log('Erro exame admissional (fn: exameAdmissional)', error)
    }
}

module.exports = exameAdmissional