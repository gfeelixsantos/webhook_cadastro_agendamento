async function getEmployeeCode(agendamento) {
    console.log(agendamento);
    try {
        let cpfFormatado = agendamento.cpf.replaceAll('.', '')
        cpfFormatado = cpfFormatado.replace('-', '')
    
        const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"${agendamento.codEmpresa}","codigo":"193586","chave":"16b663d2d0859bf14b01","tipoSaida":"json","ativo":"sim","inativo":"sim","afastado":"sim","pendente":"sim","ferias":"sim"}`;
    
        const response = await fetch(url);
        const responseBuff = await response.arrayBuffer();
        const funcionarios = new TextDecoder('iso-8859-1').decode(responseBuff);
        const listaFuncionarios = JSON.parse(funcionarios);
    
        const cadastro = listaFuncionarios.find( func => func['CPF'] == cpfFormatado);

        agendamento.codFuncionario = cadastro['CODIGO'];
        
        return agendamento
        
    } catch (error) {
        console.error('Erro ao buscar código do funcionário (fn: getEmployeeCode)', error);
    }
}

module.exports = getEmployeeCode