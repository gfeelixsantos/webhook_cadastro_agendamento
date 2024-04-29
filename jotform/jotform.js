const { default: Jotform } = require('jotform')
const Agendamento = require('../Agendamento')
const map = require('../map')

async function getSubmissionForm() {

    const APIKEY = 'cd623382cfb34ac6eb4c7126bff9c6da'
    const FORM_ID = '230894671029664'

    const options = {
        'filter': {
            'orderby': 'created_at'
        }
    }

    const client = new Jotform(APIKEY)
    const subs = await client.form.getSubmissions(FORM_ID, options)

    const funcionarioAgendado =
    new Agendamento(
        subs.content[0].answers[map.nomeFuncionario].answer,
        subs.content[0].answers[map.cpf].answer,
        subs.content[0].answers[map.dataNascimento].answer,
        subs.content[0].answers[map.cnpj].answer,
        subs.content[0].answers[map.data].answer,
        subs.content[0].answers[map.horario].answer,
        subs.content[0].answers[map.tipoExame].answer,
        subs.content[0].answers[map.cargo].answer,
        subs.content[0].answers[map.setor].answer,
        subs.content[0].answers[map.rg].answer,
        subs.content[0].answers[map.sexo].answer,
        subs.content[0].answers[map.solicitacaoAtividades].answer,
        subs.content[0].answers[map.observacoes].answer
    )
    console.log(funcionarioAgendado);
    return funcionarioAgendado
}

module.exports = getSubmissionForm

