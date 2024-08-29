async function getEmployeeExams(agendamento) {
    
    const anoAtual = new Date().getFullYear()

    try {
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"16459","codigo":"193598","chave":"c9184b11650a305f8a6e","tipoSaida":"json","empresaTrabalho":"${agendamento.empresa.codEmpresa}","funcionarios":"${agendamento.funcionario.codFuncionario}","periodo":"12/${anoAtual}","exame":"","convocarClinico":"0","nuncaRealizados":"","periodicosNuncaRealizados":"","selecao":"2","examesPendentes":"1","convocaPendentesPCMSO":""}`;
        
        const response = await fetch(url);
        const responseBuff = await response.arrayBuffer();
        const exames = new TextDecoder('iso-8859-1').decode(responseBuff);
        const arrExames = JSON.parse(exames);
        agendamento.exame.listaExames = arrExames
        
        return agendamento

    } catch (error) {
        agendamento.erro = 'SEM EXAMES PROGRAMADOS'
        agendamento.situacao = 'ERRO'

        throw new Error('Erro ao buscar código empresa (fn: getEmployeeExams)', error)
    }
}


module.exports = getEmployeeExams