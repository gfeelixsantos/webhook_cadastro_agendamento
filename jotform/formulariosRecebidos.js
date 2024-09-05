const { default: Jotform } = require('jotform')
const Atendimento = require('../aws/schema')
const codigoCampos = require('./codigoCampos')
const geraCodigoTipoExame = require('../util/geraCodigoTipoExame')

module.exports = async function formulariosRecebidos() {

    const options = {
        'filter': {
            'orderby': 'created_at'
        }
    }

    const client = new Jotform(process.env.JOTFORM_APIKEY)
    const subs = await client.form.getSubmissions(process.env.JOTFORM_FORMID, options)

    if(subs.responseCode == 200){

        // Tratamento de dados antes de salvar
        const nomeFuncionarioTrim = subs.content[0].answers[codigoCampos.nomeFuncionario].answer.trim().toUpperCase()

        const cpfFuncionario = subs.content[0].answers[codigoCampos.cpf].answer.replaceAll('.', '')
        const cpfFinal = cpfFuncionario.replace('-', '')


        const empresaTrim = subs.content[0].answers[codigoCampos.razaoSocial].answers ? subs.content[0].answers[codigoCampos.razaoSocial].answer.trim().toUpperCase() : ''
        const solicitanteAgendamento = subs.content[0].answers[codigoCampos.nomeSolicitante].answer.trim().toUpperCase()
        const emailAgendamento = subs.content[0].answers[codigoCampos.emailSolicitante].answer.trim().toLowerCase()
        
        const unidadeAgendamento = subs.content[0].answers[codigoCampos.unidade].answer ? subs.content[0].answers[codigoCampos.unidade].answer.trim().toUpperCase() : ''
        const setorAgendamento = subs.content[0].answers[codigoCampos.setor].answer ? subs.content[0].answers[codigoCampos.setor].answer.trim().toUpperCase() : ''
        const cargoAgendamento = subs.content[0].answers[codigoCampos.cargo].answer ? subs.content[0].answers[codigoCampos.cargo].answer.trim().toUpperCase() : ''
        const rgAgendamento = subs.content[0].answers[codigoCampos.rg].answer ? subs.content[0].answers[codigoCampos.rg].answer.trim() : ''
        const sexoAgendamento = subs.content[0].answers[codigoCampos.sexo].answer ? subs.content[0].answers[codigoCampos.sexo].answer : ''
        const observacoesAgendamento = subs.content[0].answers[codigoCampos.observacoes].answer ? subs.content[0].answers[codigoCampos.observacoes].answer : ''
        
        let atividadesAgendamento = []
        const atividadesEnviadas = subs.content[0].answers[codigoCampos.solicitacaoAtividades].answer ? subs.content[0].answers[codigoCampos.solicitacaoAtividades].answer : []
        Array.isArray(atividadesEnviadas) ? 
          atividadesEnviadas.forEach( e => atividadesAgendamento.push(e)) : atividadesAgendamento.push(Object.values(atividadesEnviadas))

        
        const telefoneAgendamento = subs.content[0].answers[codigoCampos.telefoneSolicitante].prettyFormat ? subs.content[0].answers[codigoCampos.telefoneSolicitante].prettyFormat : ''

        const codTipoExame = geraCodigoTipoExame(subs.content[0].answers[codigoCampos.tipoExame].answer)
        
        const agendamento = await new Atendimento({
            "id":               subs.content[0].answers[codigoCampos.identificador].answer,
            "chegada":          '',
            "dataChegada":      '',
            "dataAgendamento":  subs.content[0].answers[codigoCampos.dataAgendamento].prettyFormat,
            "horarioAgendamento":subs.content[0].answers[codigoCampos.horarioAgendamento].answer,
            "situacao":         'SOLICITADO',
            "codEmpresa":       '',
            "empresa":          empresaTrim,
            "codFuncionario":   '',
            "funcionario":      nomeFuncionarioTrim,
            "dataNascimento":   subs.content[0].answers[codigoCampos.dataNascimento].prettyFormat,
            "sexo":             sexoAgendamento,
            "rg":               rgAgendamento,
            "cpf":              cpfFinal,
            "situacaoFuncionario": 'Ativo',
            "cnpj":             subs.content[0].answers[codigoCampos.cnpj].answer,
            "unidadeTrabalho":  unidadeAgendamento,
            "codUnidadeTrabalho":'',
            "setor":            setorAgendamento,
            "codSetor":         '',
            "cargo":            cargoAgendamento,
            "codCargo":         '',
            "idFicha":          '',
            "dataFicha":        '',
            "codTipoExame":     codTipoExame,
            "tipoExame":        subs.content[0].answers[codigoCampos.tipoExame].answer,
            "unidade":          subs.content[0].answers[codigoCampos.unidadeCmso].answer,
            "realizados":       0,
            "afazer":           0,
            "riscos":           [],          
            "exames":           [],
            "observacoes":          observacoesAgendamento,
            "preferencial":         '',
            "atividadesEspeciais":  atividadesAgendamento,
            "perfil":               '',
            "nomeSolicitante":      solicitanteAgendamento,
            "emailSolicitante":     emailAgendamento,
            "telefoneSolicitante":  telefoneAgendamento,
            "anexos":               subs.content[0].answers[codigoCampos.anexos].answer,
            "erros":                []
        })
            .save()
            .catch( (e) => console.log(e) )
        // const teste = await Atendimento.scan('id').contains("CM000554").all().exec()
        // const json =  teste.toJSON()
        // return json[0]
        return agendamento
    }
    else {
        // Tratar erro caso não consiga acessar envio do formulário....
    }
}


/*
agendamentos {
  id: 'CM000229',
  chegada: '',
  dataChegada: '',
  dataAgendamento: '30/08/2024',
  horarioAgendamento: '15:00',
  situacao: 'SOLICITADO',
  codEmpresa: '',
  empresa: 'TESTE',
  codFuncionario: '',
  funcionario: 'TESTE',
  dataNascimento: '08/09/1994',
  sexo: 'MASCULINO',
  rg: '',
  cpf: '428.891.788-38',
  cnpj: '99.999.999/9999-99',
  unidadeEmpresa: '',
  setor: '',
  cargo: '',
  dataFicha: '',
  tipoExame: 'PERIÓDICO',
  unidade: 'Rio Claro',
  realizados: 0,
  afazer: 0,
  exames: [],
  observacoes: '',
  preferencial: '',
  atividadesEspeciais: [
    'MANIPULAÇÃO DE ALIMENTOS (VIGILÂNCIA)',
    'OPERAR EMPILHADEIRA',
    'TRABALHO EM ALTURA (NR 35)'
  ],
  perfil: '',
  nomeSolicitante: 'teste',
  emailSolicitante: 'esocial@cmsocupacioonal.com.br',
  telefoneSolicitante: '',
  anexos: [
    'https://www.jotform.com/uploads/cmsoatendimento/230894671029664/6007590106959567311/icone-email.png'
  ],
  createdAt: 1724949812455,
  updatedAt: 1724949812455
}
  */
