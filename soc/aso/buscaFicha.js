async function getTokenSequential(agendamento) {

    const anoAtual = new Date().getFullYear()

    try {
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":'${agendamento.codEmpresa}',"codigo":"193600","chave":"81c895206e0228be0e08","tipoSaida":"json","funcionario":"${agendamento.codFuncionario}","tipoASO":"${agendamento.codTipoExame}","paramFiltroData":"1","dataInicio":"${agendamento.data.day}/${agendamento.data.month}/${agendamento.data.year}","dataFim":"${agendamento.data.day}/${agendamento.data.month}/${agendamento.data.year}"}`;
        
        const response = await fetch(url);
        const responseBuff = await response.arrayBuffer();
        const ficha = new TextDecoder('iso-8859-1').decode(responseBuff);
        const codigoFicha = JSON.parse(ficha);
        console.log(codigoFicha);
        agendamento.codSequencial = codigoFicha[0]['IDFICHA'];
        
        return agendamento

    } catch (error) {
        console.error('Erro ao buscar exames funcionário (fn: getEmployeeExams)', error);
    }
}


module.exports = getTokenSequential