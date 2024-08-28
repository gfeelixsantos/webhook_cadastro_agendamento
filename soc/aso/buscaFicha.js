async function getTokenSequential(agendamento) {

    const anoAtual = new Date().getFullYear()

    try {
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":'${agendamento.empresa.codEmpresa}',"codigo":"193600","chave":"81c895206e0228be0e08","tipoSaida":"json","funcionario":"${agendamento.funcionario.codFuncionario}","tipoASO":"${agendamento.exame.codTipoExame}","paramFiltroData":"1","dataInicio":"${agendamento.dataAgendamento}","dataFim":"${agendamento.dataAgendamento}"}`;
        
        const response = await fetch(url);
        const responseBuff = await response.arrayBuffer();
        const ficha = new TextDecoder('iso-8859-1').decode(responseBuff);
        
        const codigoFicha = JSON.parse(ficha);
        
        if (codigoFicha.length > 0){
            agendamento.exame.codSequencial = codigoFicha[0]['IDFICHA'];
        }
        else {
            agendamento.exame.codSequencial = codigoFicha['IDFICHA'];
        }
       
        
        return agendamento

    } catch (error) {
        console.error('Erro ao buscar exames funcionário (fn: getEmployeeExams)', error);
    }
}


module.exports = getTokenSequential