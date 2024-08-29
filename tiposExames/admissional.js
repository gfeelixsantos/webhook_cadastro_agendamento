const cadastroEmpresas = require('../soc/exportaDados/cadastroEmpresas')
const cadastroFuncionarioPorEmpresa = require('../soc/exportaDados/cadastroFuncionarioPorEmpresa')
const hierarquiaEmpresa = require('../soc/exportaDados/hierarquiaEmpresa')

async function exameAdmissional(agendamento) {
    try {
        // Exporta dados
        agendamento = await cadastroEmpresas(agendamento)
        agendamento = await cadastroFuncionarioPorEmpresa(agendamento)
        agendamento = await hierarquiaEmpresa(agendamento)




        
        console.log(agendamento, 'agendamento admissional finalizado!');
        
    } catch (error) {
        console.log('Erro exame admissional (fn: exameAdmissional)', error)
    }
}

module.exports = exameAdmissional