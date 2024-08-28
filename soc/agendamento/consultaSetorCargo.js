const checkSetorCargo = require('./gemini')

async function consultaSetorCargo(agendamento) {

    try {
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"${agendamento.empresa.codEmpresa}","codigo":"198032","chave":"6d7d26a2217c0bf87c23","tipoSaida":"json"}`;
    
        const response = await fetch(url, { method: 'post'});
        const responseBuff = await response.arrayBuffer();
        const hierarquia = new TextDecoder('iso-8859-1').decode(responseBuff);
        const arrHierarquia = JSON.parse(hierarquia);
        
        const hierarquiasAtivas = arrHierarquia.filter( hie => hie['HIERARQUIA_ATIVA'] == 'Sim')

        agendamento = await checkSetorCargo(agendamento, hierarquiasAtivas)
        
        return agendamento

    } catch (error) {
        agendamento.erro = 'HIERARQUIA NÃO ENCONTRADA'
        agendamento.situacao = 'ERRO'

        throw new Error('Erro ao buscar código empresa (fn: consultaSetorCargo)', error)
    }
}

module.exports = consultaSetorCargo