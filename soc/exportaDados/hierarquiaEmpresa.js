const Gemini = require('../../gemini/index')

async function hierarquiaEmpresa(agendamento) {

    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"${agendamento.codEmpresa}","codigo":"198032","chave":"6d7d26a2217c0bf87c23","tipoSaida":"json"}`;
    
    const response      = await fetch(url, { method: 'post'});
    const responseBuff  = await response.arrayBuffer();
    const hierarquia    = new TextDecoder('iso-8859-1').decode(responseBuff);
    const arrHierarquia = JSON.parse(hierarquia);
    
    if (arrHierarquia.length > 0) {
        const hierarquiasAtivas = arrHierarquia.filter( hie => hie['HIERARQUIA_ATIVA'] == 'Sim')

        return await Gemini.buscaHierarquia(agendamento, hierarquiasAtivas)
    }
    else {
        
        // Empresa sem hierarquia....
        agendamento.situacao = 'ERRO'
        agendamento.erros.push('Empresa sem hierarquia')
        return agendamento
    }
}

module.exports = hierarquiaEmpresa