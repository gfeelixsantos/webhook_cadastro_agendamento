async function consultaSetorCargo(agendamento) {

    try {
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"${agendamento.empresa.codEmpresa}","codigo":"198032","chave":"6d7d26a2217c0bf87c23","tipoSaida":"json"}`;
    
        const response = await fetch(url, { method: 'post'});
        const responseBuff = await response.arrayBuffer();
        const hierarquia = new TextDecoder('iso-8859-1').decode(responseBuff);
        const arrHierarquia = JSON.parse(hierarquia);
        
        const hierarquiasAtivas = arrHierarquia.filter( hie => hie['HIERARQUIA_ATIVA'] == 'Sim')
        let cargo = hierarquiasAtivas.find( hie => hie['NOME_CARGO'] == agendamento.funcionario.cargo)
        
        if(cargo.length > 0){
            cargo = cargo.filter( hie => hie['NOME_SETOR'] == agendamento.funcionario.setor )
        }


        agendamento.funcionario.codCargo = cargo['CODIGO_CARGO']
        agendamento.funcionario.codSetor = cargo['CODIGO_SETOR']
        agendamento.funcionario.codUnidade = cargo['CODIGO_UNIDADE']

        agendamento.funcionario.cargo = cargo['NOME_CARGO']
        agendamento.funcionario.setor = cargo['NOME_SETOR']
        agendamento.funcionario.unidade = cargo['NOME_UNIDADE']

        
        return agendamento

    } catch (error) {
        console.error('Erro ao buscar código empresa (fn: consultaSetorCargo)', error);
    }
}

module.exports = consultaSetorCargo