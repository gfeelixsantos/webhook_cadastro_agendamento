async function getSequencialResult(agendamento) {

    try {
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":'${agendamento.empresa.codEmpresa}',"codigo":"193601","chave":"8ce693447b44481c7438","tipoSaida":"json","sequencial":"${agendamento.exame.codSequencial}","empresaTrabalho":"${agendamento.empresa.codEmpresa}"}`;
        
        const response = await fetch(url);
        const responseBuff = await response.arrayBuffer();
        const exames = new TextDecoder('iso-8859-1').decode(responseBuff);
        
        const arrExames = JSON.parse(exames);
        agendamento.exame.listaExames = arrExames;
        
        return agendamento

    } catch (error) {
        console.error('Erro ao buscar exames funcionário (fn: getEmployeeExams)', error);
    }
}


module.exports = getSequencialResult