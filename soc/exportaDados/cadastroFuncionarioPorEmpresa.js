async function cadastroFuncionarioPorEmpresa(agendamento) {

    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"16459","codigo":"192918","chave":"53f2d1bcbaacaa24fc4a","tipoSaida":"json","empresaTrabalho":"${agendamento.codEmpresa}","cpf":"${agendamento.cpf}","parametroData":"false","dataInicio":"","dataFim":""}`;
      
    const response = await fetch(url);
    const responseBuff = await response.arrayBuffer();
    const funcionarios = new TextDecoder('iso-8859-1').decode(responseBuff);
    const arrFuncionarios = JSON.parse(funcionarios);
    
    if (arrFuncionarios.length > 0){
      const cadastroAntigo   = arrFuncionarios.find( func => func)
  
      
      
      return agendamento
  
    }
    else {
      agendamento.situacao = 'ERRO'
      agendamento.mensagem = 'Não foi possível incluir funcionário.'
      throw new Error('Erro ao buscar código empresa (fn: cadastroEmpresas)', error)
    }
  }
  
  module.exports = cadastroFuncionarioPorEmpresa