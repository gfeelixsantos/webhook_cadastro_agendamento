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
        
        // Troca CNPJ caso for credenciada
        let cnpj = subs.content[0].answers[map.cnpj].answer
        if (cnpj == undefined)
        {
            cnpj = subs.content[0].answers[map.cnpjCredenciada].answer
        }

        const funcionarioAgendado =
        new Agendamento(
            subs.content[0].answers[map.nomeFuncionario].answer.toUpperCase(),
            subs.content[0].answers[map.cpf].answer,
            subs.content[0].answers[map.dataNascimento].answer,
            cnpj,
            data,
            horario,
            subs.content[0].answers[map.tipoExame].answer,
            subs.content[0].answers[map.cargo].answer,
            subs.content[0].answers[map.setor].answer,
            subs.content[0].answers[map.solicitacaoAtividades].answer,
            subs.content[0].answers[map.observacoes].answer,
            subs.content[0].answers[map.atendimentoPara].answer,
            subs.content[0].answers[map.razaoSocial].answer,
            subs.content[0].answers[map.upload].answer
        )

        return funcionarioAgendado

    } catch (error) {
        console.error('Erro ao buscar agendamento Jotform (fn: getSubmissionForm)', error);
    }
}

module.exports = getSubmissionForm

