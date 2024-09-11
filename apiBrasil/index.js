const comunicaErro = require('../util/comunicaErro')

async function apiBrasilCnpj(agendamento) {

    if (agendamento.cnpj != ''){
        const cnpjSemPontos = agendamento.cnpj.replaceAll('.', '')
        const cnpjSemBarra = cnpjSemPontos.replaceAll('/', '')
        const cnpjSemTraco = cnpjSemBarra.replaceAll('-', '')
    
        // URL Exemplo final CNPJ sem ascentos...
        const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpjSemTraco}`
    
        const response = await fetch(url)
    
        if(response.status == 400){
            comunicaErro(agendamento, 'CNPJ Inválido!')
        }
        else {
            const responseJson = await response.json()
            agendamento.empresa = responseJson.razao_social.toUpperCase()
        }
    
        return agendamento
    }

}

module.exports = apiBrasilCnpj