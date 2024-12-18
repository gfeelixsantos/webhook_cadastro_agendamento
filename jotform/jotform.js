const { default: Jotform } = require('jotform')
const Agendamento = require('../Agendamento')
const map = require('../map')

async function getSubmissionForm() {

    try {
        const APIKEY = '7542ca898e57367cc67af34c32aee5e4'
        const FORM_ID = '233323154360648'
    
        const options = {
            'filter': {
                'orderby': 'created_at'
            }
        }
    
        const client = new Jotform(APIKEY)
        const subs = await client.form.getSubmissions(FORM_ID, options)

        // Separação de data e horario
        const data = subs.content[0].answers[map.dataConvertida].answer.split(" ")[0]
        const horario = subs.content[0].answers[map.dataConvertida].answer.split(" ")[1]

        const funcionarioAgendado =
        new Agendamento(
            subs.content[0].answers[map.nomeFuncionario].answer.toUpperCase(),
            subs.content[0].answers[map.cpf].answer,
            subs.content[0].answers[map.dataNascimento].answer,
            subs.content[0].answers[map.cnpj].answer,
            data,
            horario,
            subs.content[0].answers[map.tipoExame].answer,
            subs.content[0].answers[map.cargo].answer,
            subs.content[0].answers[map.setor].answer,
            subs.content[0].answers[map.solicitacaoAtividades].answer,
            subs.content[0].answers[map.observacoes].answer
        )
        
        console.log(  funcionarioAgendado )
        return funcionarioAgendado

    } catch (error) {
        console.error('Erro ao buscar agendamento Jotform (fn: getSubmissionForm)', error);
    }
}

module.exports = getSubmissionForm

