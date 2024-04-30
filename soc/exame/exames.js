async function getEmployeeExams(agendamento) {
    
    const anoAtual = new Date().getFullYear()

    try {
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro=
        {"empresa":"16459","codigo":"193598","chave":"c9184b11650a305f8a6e","tipoSaida":"json","empresaTrabalho":"${agendamento.codEmpresa}","funcionarios":"${agendamento.codFuncionario}","periodo":"12/${anoAtual}","exame":"","convocarClinico":"0","nuncaRealizados":"0","periodicosNuncaRealizados":"1","selecao":"2","examesPendentes":"true","convocaPendentesPCMSO":"true"}`;
        
        const response = await fetch(url);
        const responseBuff = await response.arrayBuffer();
        const exames = new TextDecoder('iso-8859-1').decode(responseBuff);
        const arrExames = JSON.parse(exames);
        agendamento.listaExames = arrExames
        
        return agendamento

    } catch (error) {
        console.log('Erro ao buscar exames funcionário (fn: getEmployeeExams)', error);
    }
}


module.exports = getEmployeeExams