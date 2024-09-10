async function cadastroFuncionarioPorEmpresa(agendamento) {
    // const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"16459","codigo":"192918","chave":"53f2d1bcbaacaa24fc4a","tipoSaida":"json","empresaTrabalho":"${agendamento.codEmpresa}","cpf":"","parametroData":"false","dataInicio":"","dataFim":""}`;

    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"${agendamento.codEmpresa}","codigo":"193586","chave":"16b663d2d0859bf14b01","tipoSaida":"json","ativo":"sim","inativo":"sim","afastado":"sim","pendente":"sim","ferias":"sim"}`
  
    const response = await fetch(url);
    const responseBuff = await response.arrayBuffer();
    const funcionarios = new TextDecoder('iso-8859-1').decode(responseBuff);

    const arrFuncionarios = await JSON.parse(funcionarios)
   
    // Busca cadastro existente SOC
    if (arrFuncionarios.length > 0){
      const listaCadastrosFuncionarioCpf = arrFuncionarios.filter( func => func['CPF'] == agendamento.cpf)
      // const listaCadastrosFuncionarioNome = arrFuncionarios.filter( func => agendamento.funcionario.startWith(func['NOME'].toUpperCase()))
     
      const cadastroAntigo =  listaCadastrosFuncionarioCpf.length > 0 ? 
                              listaCadastrosFuncionarioCpf[ listaCadastrosFuncionarioCpf.length -1 ] : undefined
                              
      if (cadastroAntigo){
        // procedimento = 'ATUALIZAR'
        agendamento.codFuncionario = cadastroAntigo['CODIGO']
        agendamento.dataAdmissao = cadastroAntigo['DATA_ADMISSAO']
        agendamento.rg == '' ? agendamento.rg = cadastroAntigo['RG'] : null

        return agendamento

      }
      else {
        // procedimento = 'INCLUIR'
        const ordenaCodigosFuncionarios = arrFuncionarios.sort((a, b) => Number(a['CODIGO']) > Number(b['CODIGO']) ? 1 : -1)
        const ultimoFuncionario = ordenaCodigosFuncionarios [ordenaCodigosFuncionarios.length -1]
        const codigoGerado = Number(ultimoFuncionario['CODIGO']) + 1
        agendamento.codFuncionario = codigoGerado.toString()
        agendamento.dataAdmissao = agendamento.dataAgendamento
        
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

