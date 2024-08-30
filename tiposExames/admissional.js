const cadastroEmpresas = require('../soc/exportaDados/cadastroEmpresas')
const cadastroFuncionarioPorEmpresa = require('../soc/exportaDados/cadastroFuncionarioPorEmpresa')
const hierarquiaEmpresa = require('../soc/exportaDados/hierarquiaEmpresa')
const webserviceFuncionarioModelo2 = require('../soc/webservice/funcionarioModelo2')
const riscosFuncionario = require('../soc/exportaDados/riscosFuncionario')
const cadastroRiscoEmpresa = require('../soc/exportaDados/cadastroRiscoEmpresa')
const examesFuncionario = require('../soc/exportaDados/examesFuncionario')
const webservicePedidoExame = require('../soc/webservice/incluiPedidoExame')
const pedidoExame = require('../soc/exportaDados/pedidoExame')
const webserviceIncluiAso = require('../soc/webservice/incluiAso')
const pedidoExamePeloSequencialFicha = require('../soc/exportaDados/pedidoExamePeloSequencialFicha')
const resultadoExame = require('../soc/webservice/resultadoExame')

const timer = require('../util/timer')

async function exameAdmissional(agendamento) {
    try {
        console.log(agendamento);
        
        // Dados iniciais
        agendamento = await cadastroEmpresas(agendamento)
        await timer()
        agendamento = await cadastroFuncionarioPorEmpresa(agendamento)
        await timer()
        agendamento = await hierarquiaEmpresa(agendamento)
        await webserviceFuncionarioModelo2(agendamento)
        
        // Riscos
        await timer()
        agendamento = await riscosFuncionario(agendamento)
        await cadastroRiscoEmpresa(agendamento)

        // ASO
        await timer()
        agendamento = await examesFuncionario(agendamento)
        await webservicePedidoExame(agendamento)
        await timer()
        agendamento = await pedidoExame(agendamento)
        await webserviceIncluiAso(agendamento)
        await timer()
        agendamento = await pedidoExamePeloSequencialFicha(agendamento)
        
        for( const resultado of agendamento.exames ){
            await resultadoExame(agendamento, resultado)
            await timer()
        }
        
        




        return console.log( '----------------------------->> agendamento finalizado!' );
        
    } catch (error) {
        console.log('Erro exame admissional (fn: exameAdmissional)', error)
    }
}



module.exports = exameAdmissional