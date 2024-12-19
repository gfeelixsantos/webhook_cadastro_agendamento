async function getEmployeeCode(agendamento) {
    console.log(agendamento)
    try {
        let cpfFormatado = agendamento.cpf.replaceAll('.', '')
        cpfFormatado = cpfFormatado.replace('-', '')
    
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"${agendamento.codEmpresa}","codigo":"201109","chave":"31b20d92cb999d6ead81","tipoSaida":"json","empresaTrabalho":"${agendamento.codEmpresa}","cpf":"${cpfFormatado}","parametroData":"","dataInicio":"","dataFim":""}`;
    
        const response = await fetch(url);
        const responseBuff = await response.arrayBuffer();
        const funcionarios = new TextDecoder('iso-8859-1').decode(responseBuff);
        const listaFuncionarios = JSON.parse(funcionarios);

        
        const cadastro = listaFuncionarios.find( func => func['CPFFUNCIONARIO'] == cpfFormatado);

        if (cadastro == undefined)
        {
            agendamento.codFuncionario = 'ADICIONAR';
        }
        else
        {
            agendamento.codFuncionario = cadastro['CODIGO'];
        }
        
        return agendamento
        
    } catch (error) {
        console.error('Erro ao buscar código do funcionário (fn: getEmployeeCode)', error);
    }
}

module.exports = getEmployeeCode