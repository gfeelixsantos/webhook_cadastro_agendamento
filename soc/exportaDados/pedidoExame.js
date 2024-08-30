
async function pedidoExame(agendamento) {
    
    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"${ agendamento.codEmpresa }","codigo":"161440","chave":"3d0851191bdd7e498167","tipoSaida":"json","paramSequencial":"","sequenciaFicha":"","funcionarioInicio":"1","funcionarioFim":"99999","paramData":"","dataInicio":"${ agendamento.dataAgendamento }","dataFim":"${ agendamento.dataAgendamento }","paramFunc":"1","cpffuncionario":"${ agendamento.cpf }","nomefuncionario":"","codpresta":"","nomepresta":"","paramPresta":"","codunidade":"","nomeunidade":"","paramUnidade":""}`;
        
    const response = await fetch(url);
    const responseBuff = await response.arrayBuffer();
    const pedidoExame = new TextDecoder('iso-8859-1').decode(responseBuff);
    
    if(pedidoExame.length > 2){
        const jsonPedidoExame = JSON.parse(pedidoExame)
        const pedidoAgendamento = jsonPedidoExame.find( pedido => pedido['DATAFICHA'] == agendamento.dataAgendamento )
        
        agendamento.idFicha = pedidoAgendamento['SEQUENCIAFICHA']
    }
    else{
        // Nao abriu pedido de exame...
    }
    
    
    
    return agendamento
}

module.exports = pedidoExame