async function cadastroFuncionarioPorEmpresa(agendamento) {
    // const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"16459","codigo":"192918","chave":"53f2d1bcbaacaa24fc4a","tipoSaida":"json","empresaTrabalho":"${agendamento.codEmpresa}","cpf":"","parametroData":"false","dataInicio":"","dataFim":""}`;

    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"${agendamento.codEmpresa}","codigo":"193586","chave":"16b663d2d0859bf14b01","tipoSaida":"json","ativo":"sim","inativo":"sim","afastado":"sim","pendente":"sim","ferias":"sim"}`
  
    const response = await fetch(url);
    const responseBuff = await response.arrayBuffer();
    const funcionarios = new TextDecoder('iso-8859-1').decode(responseBuff);

    const arrFuncionarios = await JSON.parse(funcionarios)

    // Busca cadastro existente SOC
    if (arrFuncionarios.length > 0){
      const listaCadastrosFuncionarioCpf = arrFuncionarios.filter( func => func['CPFFUNCIONARIO'] == agendamento.cpf)
      const listaCadastrosFuncionarioNome = arrFuncionarios.filter( func => agendamento.funcionario.includes(func['NOME'].toUpperCase()))
      
      const cadastroAntigo =  listaCadastrosFuncionarioCpf.length > 0 ? 
                              listaCadastrosFuncionarioCpf[ listaCadastrosFuncionarioCpf.length -1 ] :
                              null
                              // listaCadastrosFuncionarioNome[listaCadastrosFuncionarioNome.length -1]
      

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


  /*
  {
    CODIGOEMPRESA: '1434953',
    NOMEEMPRESA: 'ASK CRIOS PRODUTOS QUIMICOS DO BRASIL LTDA.',
    CODIGO: '41',
    NOME: 'ANDERSON LUIS PIRES DE SOUZA',
    CODIGOUNIDADE: '001',
    NOMEUNIDADE: 'ASK CRIOS PRODUTOS QUIMICOS DO BRASIL LTDA',
    CODIGOSETOR: '23',
    NOMESETOR: 'EFLUENTES LIQUIDOS',
    CODIGOCARGO: '26',
    NOMECARGO: 'LÍDER DE EFLUENTES',
    CBOCARGO: '',
    CCUSTO: '',
    NOMECENTROCUSTO: '',
    MATRICULAFUNCIONARIO: '31227',
    CPF: '11538889803',
    RG: '17764888 SSP-SP',
    UFRG: '',
    ORGAOEMISSORRG: '',
    SITUACAO: 'Ativo',
    SEXO: '1',
    PIS: '1702425146-6',
    CTPS: '000630200069SP',
    SERIECTPS: '',
    ESTADOCIVIL: '0',
    TIPOCONTATACAO: '1',
    DATA_NASCIMENTO: '03/01/1969',
    DATA_ADMISSAO: '01/02/1999',
    DATA_DEMISSAO: '',
    ENDERECO: '',
    NUMERO_ENDERECO: '0',
    BAIRRO: '',
    CIDADE: '',
    UF: '',
    CEP: '',
    TELEFONERESIDENCIAL: '',
    TELEFONECELULAR: '',
    EMAIL: '',
    DEFICIENTE: '0',
    DEFICIENCIA: '',
    NM_MAE_FUNCIONARIO: '',
    DATAULTALTERACAO: '06/12/2023',
    MATRICULARH: '',
    COR: '0',
    ESCOLARIDADE: '0',
    NATURALIDADE: '',
    RAMAL: '',
    REGIMEREVEZAMENTO: '0',
    REGIMETRABALHO: '',
    TELCOMERCIAL: '',
    TURNOTRABALHO: '0',
    RHUNIDADE: '',
    RHSETOR: '',
    RHCARGO: '',
    RHCENTROCUSTOUNIDADE: ''
  }
    */