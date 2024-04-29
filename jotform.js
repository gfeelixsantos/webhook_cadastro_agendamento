const { default: Jotform } = require('jotform')
const map = require('./map')

async function getSubmissionForm() {

    const APIKEY = 'cd623382cfb34ac6eb4c7126bff9c6da'
    const options = {
        'filter': {
            'orderby': 'created_at'
        }
    }

    const client = new Jotform(APIKEY)
    const subs = await client.form.getSubmissions('230894671029664',options)

    console.log(subs.content[0].answers[map.nomeFuncionario]);
}

module.exports = getSubmissionForm

