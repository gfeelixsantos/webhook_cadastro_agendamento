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

// const app = express();
// const PORT = process.env.PORT || 3001;
 
// app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Serviço de webhook online!');
// })

// app.post('/', async (req, res) => {
//     try {
//         await dev()
        
//     } catch (error) {
//         console.error('Erro na execução index.js')
//     }
// })

const MOCK =  {
    codEmpresa: '1804775',
    codFuncionario: '',
    codTipoExame: 2,
    codSequencial: '',
    riscos: [],
    nome: 'TESTE GABRIEL',
    cpf: '101.402.386-61',
    dataNascimento: '21/10/1991',    
    cnpj: '41.449.329/0001-11',      
    data: '19/12/2024',
    horario: '14:15',
    tipoExame: 'PERIODICO',
    cargo: 'testeCAR',
    setor: 'testeSET',
    solicitacaoAtividades: undefined,
    observacoes: 'campo observacao',
    perfil: 'CLIENTES',
    razaoSocial: 'PREVER TESTE'
  }


async function dev() {
    //let agendamento = await getSubmissionForm()
    let agendamento = MOCK
    
    if(agendamento.perfil == 'CLIENTES'){
        
        agendamento = await ajustaTipoExame(agendamento)
        agendamento = await getCompanyCode(agendamento)
        agendamento = await getEmployeeCode(agendamento)
        
        // Se não houver código do funcionario, adiciona no cadastro.
        if(agendamento.codFuncionario == 'ADICIONAR')
        {
            
        }

        // soap agendamento
        let xml = await createXML(agendamento)
        // await sendSoapSchedule(xml)
        await timer()

        // soap pedido exame
        // agendamento = await getEmployeeExams(agendamento)
        // xml = await examRequestXml(agendamento)
        // sendSoapExamRequest(xml)

        // await timer()
       
        // // soap resultado exames
        // agendamento = await getTokenSequential(agendamento)
        // agendamento = await getSequencialResult(agendamento)

        // for (let index = 0; index < agendamento.listaExames.length; index++) {
        //     xml = await resultsXML(agendamento, index)
        //     await sendSoapExamRequest(xml)
        //     await timer()
        // }

        // // aso
        // agendamento = await getRisks(agendamento)
        // xml = await asoCreateXML(agendamento)
        // await sendSoapAso(xml)
        // await timer()
        
        
    }
    else {
        console.log('atendimento credenciadas....');
    }

} 
dev()

async function timer() {
    return await new Promise((resolve) => setTimeout(resolve, 3500));
}


// app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
