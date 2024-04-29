const express = require('express');
const getSubmissionForm = require('./jotform/jotform')
const getCompanyCode = require('./soc/empresa')
const getEmployeeCode = require('./soc/funcionario')
const createXML = require('./soc/gerarxml')
const ajustaTipoExameSoap = require('./soc/ajustaTipoExame')
const soapIncluir = require('./soc/soapIncluir')

const app = express();
const PORT = process.env.PORT || 3001;
 
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Serviço de webhook online!');
})

app.post('/', async (req, res) => {
    dev()
})

async function dev() {
    let agendamento = await getSubmissionForm()

    if(agendamento.tipoExame != 'ADMISSIONAL'){
        agendamento = await getCompanyCode(agendamento)
        agendamento = await getEmployeeCode(agendamento)
        agendamento = await ajustaTipoExameSoap(agendamento)
        const xml = await createXML(agendamento)
        soapIncluir(xml)
    }
    else {
        // Atendimento admissional...
        console.log('atendimento admissional, em desenvolvimento....');
    }

}

app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 