const Gemini = require('../../gemini/gemini')
//const comunicaErro = require('../../util/comunicaErro')

async function hierarquiaEmpresa(agendamento) {

    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":'${agendamento.codEmpresa}',"codigo":"201113","chave":"f656dd6180755a6cd644","tipoSaida":"json"}`;
    
    const response      = await fetch(url, { method: 'post'});
    const responseBuff  = await response.arrayBuffer();
    const hierarquia    = new TextDecoder('iso-8859-1').decode(responseBuff);
    const arrHierarquia = JSON.parse(hierarquia);
    
    if (arrHierarquia.length > 0) {
        const hierarquiasAtivas = arrHierarquia.filter( hie => hie['HIERARQUIA_ATIVA'] == 'Sim')

        agendamento = await Gemini.buscaHierarquia(agendamento, hierarquiasAtivas)
        
        return agendamento
    }
    else {
        
        // Empresa sem hierarquia....
        // comunicaErro(agendamento, 'Empresa sem hierarquia')
        // return agendamento
    }
}

module.exports = hierarquiaEmpresa