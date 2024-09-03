async function pedidoExamePeloSequencialFicha(agendamento) {

    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":'${agendamento.codEmpresa}',"codigo":"193601","chave":"8ce693447b44481c7438","tipoSaida":"json","sequencial":"${agendamento.idFicha}","empresaTrabalho":"${agendamento.codEmpresa}"}`;
        
    const response = await fetch(url);
    const responseBuff = await response.arrayBuffer();
    const sequencialResultado = new TextDecoder('iso-8859-1').decode(responseBuff);

    const jsonSequencialResultados = JSON.parse(sequencialResultado);
    
    for (const codigo of jsonSequencialResultados){
        agendamento.exames.find( ex => {
            
            if (ex['codigo'] == codigo['CODIGOEXAME']){
                ex['sequencialResultado'] = codigo['SEQUENCIALRESULTADO']
            }
        })
    }
    
    
    return agendamento
}


module.exports = pedidoExamePeloSequencialFicha