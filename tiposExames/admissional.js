const cadastroEmpresas = require('../soc/exportaDados/cadastroEmpresas')
const cadastroFuncionarioPorEmpresa = require('../soc/exportaDados/cadastroFuncionarioPorEmpresa')

async function exameAdmissional(agendamento) {
    try {
        // Busca empresa SOC
        agendamento = await cadastroEmpresas(agendamento)
        agendamento = await cadastroFuncionarioPorEmpresa(agendamento)





        
        console.log(agendamento, 'agendamento admissional finalizado!');
        
    } catch (error) {
        console.log('Erro exame admissional (fn: exameAdmissional)', error)
    }
}

module.exports = exameAdmissional