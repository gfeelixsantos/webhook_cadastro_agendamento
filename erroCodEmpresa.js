const exameAdmissional = require('./tiposExames/admissional')

const erroCodigoEmpresa = {
    id: 'CM000296',
    chegada: '',
    dataChegada: '',
    dataAgendamento: '02/09/2024',
    horarioAgendamento: '09:30',
    situacao: 'SOLICITADO',
    codEmpresa: '389560',
    empresa: 'VIVA PISOS E REVESTIMENTOS LTDA - FILIAL',
    codFuncionario: 861,
    funcionario: 'LUCAS CARLOS MARTINS DA SILVA',
    dataNascimento: '11/07/1994',
    sexo: 'MASCULINO',
    rg: '06256153484',
    cpf: '12373608626',
    situacaoFuncionario: 'Ativo',
    cnpj: '14.274.947/0002-86',
    unidadeTrabalho: 'FILIAL',
    codUnidadeTrabalho: '001',
    setor: 'ACONDICIONAMENTO',
    codSetor: '004',
    cargo: 'OPERADOR DE PALETIZADORA',
    codCargo: '004',
    idFicha: '271105607',
    dataFicha: '',
    codTipoExame: 1,
    tipoExame: 'ADMISSIONAL',
    unidade: 'RIO CLARO',
    realizados: 0,
    afazer: 0,
    riscos: [
      { codRisco: '1', nomeRisco: 'Ruído' },
      { codRisco: '409', nomeRisco: 'Postura em pé por longos períodos' },
      { codRisco: '318', nomeRisco: 'Prensagem de dedos e/ou mãos' },
      { codRisco: '482', nomeRisco: 'Queda de material' },
      { codRisco: '300', nomeRisco: 'Queimaduras' }
    ],
    exames: [
      {
        status: 'aguardando',
        data: '02/09/2024',
        sala: '0',
        finalizado: '0',
        espera: 0,
        nome: 'Audiometria tonal ocupacional (Cód. eSocial - 0281)',
        codigo: '51.01.004-6',
        sequencialResultado: '524448555'
      },
      {
        status: 'aguardando',
        data: '02/09/2024',
        sala: '0',
        finalizado: '0',
        espera: 0,
        nome: 'Avaliação Clínica Ocupacional (Anamnese e Exame físico) (Cód. eSocial - 0295)',
        codigo: 'clinico',
        sequencialResultado: '524448556'
      },
      {
        status: 'aguardando',
        data: '02/09/2024',
        sala: '0',
        finalizado: '0',
        espera: 0,
        nome: 'Avaliação da acuidade visual (Cód. eSocial - 0296)',
        codigo: '50.01.001-8',
        sequencialResultado: '524448557'
      }
    ],
    observacoes: '',
    preferencial: '',
    atividadesEspeciais: [],
    perfil: '',
    nomeSolicitante: 'ALINE',
    emailSolicitante: 'rh@vivaceramica.com.br',
    telefoneSolicitante: '(19) 35459300',
    anexos: [],
    mensagem: '',
    createdAt: 1725024437881,
    updatedAt: 1725024437881
  }

  exameAdmissional(erroCodigoEmpresa)