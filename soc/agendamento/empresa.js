async function getCompanyCode(agendamento) {

    try {
        // PRIMEIRO VERIFICA AS EMPRESAS CLIENTES, CASO NÃO ENCONTRAR BUSCA EM SOCNET
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={'empresa':'941933','codigo':'201168','chave':'31b8f316effd7c60434b','tipoSaida':'json','empresafiltro':'','subgrupo':'','socnet':'','mostrarinativas':''}`;
    
        const response = await fetch(url);
        const responseBuff = await response.arrayBuffer();
        const empresas = new TextDecoder('iso-8859-1').decode(responseBuff);
        const arrEmpresas = JSON.parse(empresas);
        
        const empresaAgendada = arrEmpresas.find( emp => emp['cnpj'] == agendamento.cnpj)
        
        agendamento.codEmpresa = empresaAgendada['codigo']
        agendamento.razaoSocial = empresaAgendada['razaoSocial']
                
        return agendamento

    } catch (error) {
        console.error('Erro ao buscar código empresa (fn: getCompanyCode)', error);
    }
}

module.exports = getCompanyCode