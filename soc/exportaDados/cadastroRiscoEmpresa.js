const webserviceCopiaRisco = require('../webservice/copiaRisco')

async function cadastroRiscoEmpresa(agendamento) {
    
    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"16459","codigo":"198100","chave":"aacce9903d91a5196136","tipoSaida":"json","empresaTrabalho":"${agendamento.codEmpresa}"}`;
        
    const response = await fetch(url);
    const responseBuff = await response.arrayBuffer();
    const cadastroRiscos = new TextDecoder('iso-8859-1').decode(responseBuff);
    
    if (cadastroRiscos.length > 0){

        const jsonCadastroRisco = JSON.parse( cadastroRiscos )
        
        // Consulta de riscos do agendamento existe na empresa
        for( const risco of agendamento.riscos){
            const check = jsonCadastroRisco.find( r => r['COD'] == risco.codRisco )
            
            
            if (!check){
                await webserviceCopiaRisco(agendamento, risco)
            }
            
        }
        
    }
    else {

        // Inclusão caso não tenha nenhum risco cadastrado
        for( const risco of agendamento.riscos){
            await webserviceCopiaRisco(agendamento, risco)
        }
    }
    
    
    
    return agendamento
}

module.exports = cadastroRiscoEmpresa