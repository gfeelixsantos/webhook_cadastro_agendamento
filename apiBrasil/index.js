async function apiBrasilCnpj(agendamento) {

    const cnpjSemPontos = agendamento.cnpj.replaceAll('.', '')
    const cnpjSemBarra = cnpjSemPontos.replaceAll('/', '')
    const cnpjSemTraco = cnpjSemBarra.replaceAll('-', '')

    // URL Exemplo final CNPJ sem ascentos...
    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpjSemTraco}`

    const response = await fetch(url)

    if(response.status == 400){
        agendamento.situacao = 'ERRO'
        agendamento.erros.push('CNPJ Inválido!')
    }
    else {
        const responseJson = await response.json()
        agendamento.empresa = responseJson.razao_social
    }

    return agendamento
}

module.exports = apiBrasilCnpj