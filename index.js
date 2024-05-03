const express = require('express');
const getSubmissionForm = require('./jotform/jotform')

// agendamento
const getCompanyCode = require('./soc/agendamento/empresa')
const getEmployeeCode = require('./soc/agendamento/funcionario')
const createXML = require('./soc/agendamento/gerarxml')
const ajustaTipoExame = require('./soc/agendamento/ajustaTipoExame')
const sendSoapSchedule = require('./soc/agendamento/soapAgendamento')

// pedido de exame
const getEmployeeExams = require('./soc/exame/exames')
const examRequestXml = require('./soc/exame/examRequestXml')
const sendSoapExamRequest = require('./soc/exame/soapPedido')

// resultado exames
const getTokenSequential = require('./soc/aso/buscaFicha')
const resultsXML = require('./soc/exame/resultados')
const getSequencialResult = require('./soc/exame/sequencialResultado')

// aso
const getRisks = require('./soc/aso/riscos')
const asoCreateXML = require('./soc/aso/asoXml')
const sendSoapAso = require('./soc/aso/soapAso')

const app = express();
const PORT = process.env.PORT || 3001;
 
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Serviço de webhook online!');
})

app.post('/', async (req, res) => {
    try {
        await dev()
        
    } catch (error) {
        console.error('Erro na execução index.js')
    }
})


async function dev() {
    let agendamento = await getSubmissionForm()

    if(agendamento.tipoExame != 'ADMISSIONAL' && agendamento.tipoExame != 'MUDANÇA DE RISCO OCUPACIONAL'){
        agendamento = await getCompanyCode(agendamento)
        agendamento = await getEmployeeCode(agendamento)
        agendamento = await ajustaTipoExame(agendamento)
        
        // soap agendamento
        let xml = await createXML(agendamento)
        sendSoapSchedule(xml)

        // soap pedido exame
        agendamento = await getEmployeeExams(agendamento)
        xml = await examRequestXml(agendamento)
        sendSoapExamRequest(xml)

        await timer()
       
        // soap resultado exames
        agendamento = await getTokenSequential(agendamento)
        agendamento = await getSequencialResult(agendamento)

        for (let index = 0; index < agendamento.listaExames.length; index++) {
            xml = await resultsXML(agendamento, index)
            await sendSoapExamRequest(xml)
            await timer()
        }

        // aso
        agendamento = await getRisks(agendamento)
        xml = await asoCreateXML(agendamento)
        await sendSoapAso(xml)
        await timer()
        
        
    }
    else {
        // Atendimento admissional...
        console.log('atendimento admissional, em desenvolvimento....');
    }

} 

async function timer() {
    return await new Promise((resolve) => setTimeout(resolve, 3500));
}

app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 