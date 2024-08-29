const express = require('express');
const getSubmissionForm = require('./jotform/jotform')

// funcionario modelo2
const xmlFuncionarioModelo2 = require('./soc/funcionario/xmlModelo2')

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
const sendSoapAso = require('./soc/aso/soapAso');
const consultaSetorCargo = require('./soc/agendamento/consultaSetorCargo');

const app = express();
const PORT = process.env.PORT || 3001;
const INTERVAL_TIME = 60000
let pedidos = []
 
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Serviço de webhook online!');
})

app.post('/', async (req, res) => {
    getForm()
})

async function getForm() {
    let funcionarioAgendado = await getSubmissionForm()
    pedidos.push(funcionarioAgendado)
}


async function dev() {

        setInterval( async() => {
            
            if (pedidos.length > 0){
                
                try {
                    let agendamento = pedidos[0]
                
                    agendamento = await getCompanyCode(agendamento)
                    agendamento = await getEmployeeCode(agendamento)
                    
                    if(agendamento.exame.tipoExame == 'ADMISSIONAL'){
                        agendamento = await consultaSetorCargo(agendamento)
                        await xmlFuncionarioModelo2(agendamento)
                        timer()
                    }

                    agendamento = await ajustaTipoExame(agendamento)
                    
                    
                    // soap agendamento
                    let xml = await createXML(agendamento)
                    await sendSoapSchedule(xml)

                    // soap pedido exame
                    agendamento = await getEmployeeExams(agendamento)
                    xml = await examRequestXml(agendamento)
                    await sendSoapExamRequest(xml)

                    await timer()
                
                    // soap resultado exames
                    agendamento = await getTokenSequential(agendamento)
                    agendamento = await getSequencialResult(agendamento)

                    for (let index = 0; index < agendamento.exame.listaExames.length; index++) {
                        xml = await resultsXML(agendamento, index)
                        await sendSoapExamRequest(xml)
                        await timer()
                    }

                    // aso
                    agendamento = await getRisks(agendamento)
                    xml = await asoCreateXML(agendamento)
                    await sendSoapAso(xml)
                    await timer()

                    pedidos.shift(agendamento)
                    
                } catch (error) {
                    console.log(error);
                }

            } else {
                console.log('Sem pedidos...');
                
            }
        }, INTERVAL_TIME)
    

} 

async function timer() {
    return await new Promise((resolve) => setTimeout(resolve, 5000));
}
dev()


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 