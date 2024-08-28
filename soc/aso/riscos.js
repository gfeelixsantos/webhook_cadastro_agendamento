async function getRisks(agendamento) {

    try {
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":'16459',"codigo":"193602","chave":"8355c87bb9157db187cb","tipoSaida":"json","empresaTrabalho":"${agendamento.codEmpresa}","funcionario":"${agendamento.codFuncionario}"}`;
        
        const response = await fetch(url);
        const responseBuff = await response.arrayBuffer();
        const riscos = new TextDecoder('iso-8859-1').decode(responseBuff);
        const arrRiscos = JSON.parse(riscos);
        
        if(arrRiscos.length > 0){
            arrRiscos.forEach(risco => agendamento.riscos.push(risco['CODRISCO']));
        }
        else {
            // Inserir ausencia de risco
        }
        
        
        return agendamento

    } catch (error) {
        console.log('Erro ao buscar riscos funcionário (fn: getRisks)', error);
    }
}


module.exports = getRisks