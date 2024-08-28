const { default: Jotform } = require('jotform')
const Agendamento = require('../Agendamento')
const map = require('../map')

async function getSubmissionForm() {

    try {
        const APIKEY = 'cd623382cfb34ac6eb4c7126bff9c6da'
        const FORM_ID = '230894671029664'
    
        const options = {
            'filter': {
                'orderby': 'created_at'
            }
        }
    
        const client = new Jotform(APIKEY)
        const subs = await client.form.getSubmissions(FORM_ID, options)

        const cpf = subs.content[0].answers[map.cpf].answer.trim().replaceAll('.', '')
        const cpfFormatado = cpf.replace('-', '')
        
        const funcionarioAgendado =
        new Agendamento(
            subs.content[0].answers[map.nomeFuncionario].answer.trim(),
            cpfFormatado,
            subs.content[0].answers[map.dataNascimento].prettyFormat,
            subs.content[0].answers[map.cnpj].answer.trim(),
            subs.content[0].answers[map.data].prettyFormat,
            subs.content[0].answers[map.horario].answer,
            subs.content[0].answers[map.tipoExame].answer,
            subs.content[0].answers[map.cargo].answer,
            subs.content[0].answers[map.setor].answer,
            subs.content[0].answers[map.rg].answer,
            subs.content[0].answers[map.sexo].answer,
            subs.content[0].answers[map.solicitacaoAtividades].answer,
            subs.content[0].answers[map.observacoes].answer,
            subs.content[0].answers[map.nomeSolicitante].answer,
            subs.content[0].answers[map.emailSolicitante].answer,
            subs.content[0].answers[map.telefoneSolicitante].prettyFormat,
            subs.content[0].answers[map.anexos].answer
        )
        
        return funcionarioAgendado

    } catch (error) {
        console.error('Erro ao buscar agendamento Jotform (fn: getSubmissionForm)', error);
    }
}

module.exports = getSubmissionForm

