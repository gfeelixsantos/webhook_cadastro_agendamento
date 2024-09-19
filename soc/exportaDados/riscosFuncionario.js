async function riscosFuncionario(agendamento) {
    
    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":'16459',"codigo":"193602","chave":"8355c87bb9157db187cb","tipoSaida":"json","empresaTrabalho":"${agendamento.codEmpresa}","funcionario":"${agendamento.codFuncionario}"}`;
        
    const response = await fetch(url);
    const responseBuff = await response.arrayBuffer();
    const riscos = new TextDecoder('iso-8859-1').decode(responseBuff);
    
    if(riscos != 'Sem Resultado'){
        const arrRiscos = JSON.parse(riscos);
        arrRiscos.forEach(risco => agendamento.riscos.push({ codRisco: risco['CODRISCO'], nomeRisco: risco['RISCO'] }));
    }
    else {
        // Inserir ausencia de risco
        agendamento.riscos.push({ codRisco: '520', nomeRisco: 'Exposição a riscos gerais da atividade, conforme descrição da função.' })
    }

    // Pedido de atividades especiais
    if (agendamento.atividadesEspeciais.length > 0){

        for(const pedido of agendamento.atividadesEspeciais){
            if (pedido == 'TRABALHO EM ALTURA (NR 35)'){
                agendamento.riscos.push({ codRisco: '336', nomeRisco: 'Diferença de nível maior que 2 metros / Queda em altura' })
            }
            if (pedido == 'TRABALHO EM ESPAÇO CONFINADO (NR 33)'){
                agendamento.riscos.push({ codRisco: '364', nomeRisco: 'Operações em Espaço Confinado' })
            }
            if (pedido == 'MANIPULAÇÃO DE ALIMENTOS (VIGILÂNCIA)'){
                agendamento.riscos.push({ codRisco: '249', nomeRisco: 'Prevenção - Vigilância Sanitária' })
            }
            if (pedido == 'OPERAR EMPILHADEIRA'){
                agendamento.riscos.push({ codRisco: '421', nomeRisco: 'Operar Empilhadeira' })
            }
        }
    }
       
    return agendamento
}

module.exports = riscosFuncionario