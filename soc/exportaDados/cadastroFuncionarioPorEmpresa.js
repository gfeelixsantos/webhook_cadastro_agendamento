async function cadastroFuncionarioPorEmpresa(agendamento) {

    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"16459","codigo":"192918","chave":"53f2d1bcbaacaa24fc4a","tipoSaida":"json","empresaTrabalho":"${agendamento.codEmpresa}","cpf":"","parametroData":"0","dataInicio":"","dataFim":""}`;
        
    const response = await fetch(url);
    const responseBuff = await response.arrayBuffer();
    const funcionarios = new TextDecoder('iso-8859-1').decode(responseBuff);
    const arrFuncionarios = JSON.parse(funcionarios);
    
    // Busca cadastro existente SOC
    if (arrFuncionarios.length > 0){
      
      const cadastroAntigo = arrFuncionarios.find( func => func['CPFFUNCIONARIO'] == agendamento.cpf)

      if (cadastroAntigo){
        // procedimento = 'ATUALIZAR'
        agendamento.codFuncionario = cadastroAntigo['CODIGO']
        return agendamento

      }
      else {
        // procedimento = 'INCLUIR'
        agendamento.codFuncionario = arrFuncionarios.length +1
        return agendamento
      }

    }
    else {

      // Situação em que a empresa não tem funcionário...
      agendamento.codFuncionario = '1'
      return agendamento
    }
  }
  
  module.exports = cadastroFuncionarioPorEmpresa