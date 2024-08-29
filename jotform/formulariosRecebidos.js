const { default: Jotform } = require('jotform')
const Atendimento = require('../aws/schema')
const codigoCampos = require('./codigoCampos')

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
        const empresaTrim = subs.content[0].answers[codigoCampos.razaoSocial].answer.trim().toUpperCase()
        
        const unidadeAgendamento = subs.content[0].answers[codigoCampos.unidade].answer ? subs.content[0].answers[codigoCampos.unidade].answer : ''
        const setorAgendamento = subs.content[0].answers[codigoCampos.setor].answer ? subs.content[0].answers[codigoCampos.setor].answer : ''
        const cargoAgendamento = subs.content[0].answers[codigoCampos.cargo].answer ? subs.content[0].answers[codigoCampos.cargo].answer : ''
        const rgAgendamento = subs.content[0].answers[codigoCampos.rg].answer ? subs.content[0].answers[codigoCampos.rg].answer : ''
        const sexoAgendamento = subs.content[0].answers[codigoCampos.sexo].answer ? subs.content[0].answers[codigoCampos.sexo].answer : ''
        const observacoesAgendamento = subs.content[0].answers[codigoCampos.observacoes].answer ? subs.content[0].answers[codigoCampos.observacoes].answer : ''
        const atividadesAgendamento = subs.content[0].answers[codigoCampos.solicitacaoAtividades].answer ? subs.content[0].answers[codigoCampos.solicitacaoAtividades].answer : []
        const telefoneAgendamento = subs.content[0].answers[codigoCampos.telefoneSolicitante].prettyFormat ? subs.content[0].answers[codigoCampos.telefoneSolicitante].prettyFormat : ''

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
            "cpf":              subs.content[0].answers[codigoCampos.cpf].answer,
            "cnpj":             subs.content[0].answers[codigoCampos.cnpj].answer,
            "unidadeEmpresa":   unidadeAgendamento,
            "setor":            setorAgendamento,
            "cargo":            cargoAgendamento,
            "dataFicha":        '',
            "tipoExame":        subs.content[0].answers[codigoCampos.tipoExame].answer,
            "unidade":          process.env.UNIDADE_SISTEMA,
            "realizados":       0,
            "afazer":           0,
            "exames":           [],
            "observacoes":          observacoesAgendamento,
            "preferencial":         '',
            "atividadesEspeciais":  atividadesAgendamento,
            "perfil":               '',
            "nomeSolicitante":      subs.content[0].answers[codigoCampos.nomeSolicitante].answer,
            "emailSolicitante":     subs.content[0].answers[codigoCampos.emailSolicitante].answer,
            "telefoneSolicitante":  telefoneAgendamento,
            "anexos":               subs.content[0].answers[codigoCampos.anexos].answer
        })
            .save()
            .then( (e) => console.log(e))
            .catch( (e) => console.log(e) )
        
        
    }
    else {
        // Tratar erro caso não consiga acessar envio do formulário....
    }
}



