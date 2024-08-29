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
        agendamento.codFuncionario          = cadastroAntigo['CODIGO']
        agendamento.funcionario             = cadastroAntigo['NOME']
        agendamento.situacaoFuncionario     = cadastroAntigo['SITUACAO']
        
        return agendamento.procedimento = 'ATUALIZAR'

      }
      else {
        agendamento.codFuncionario          = cadastroAntigo[arrFuncionarios.length -1]

        return agendamento.procedimento = 'INCLUIR'
      }

    }
    else {

      // Situação em que a empresa não tem funcionário...
      // agendamento.situacao = 'ERRO'
      // agendamento.mensagem = ''
      // throw new Error('Erro ao buscar código empresa (fn: cadastroEmpresas)', error)
      
    }
  }
  
  module.exports = cadastroFuncionarioPorEmpresa