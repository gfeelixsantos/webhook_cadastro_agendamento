const express = require('express');
const getSubmissionForm = require('./jotform/jotform')

// agendamento
const getCompanyCode = require('./soc/agendamento/empresa')
const getEmployeeCode = require('./soc/agendamento/funcionario')
const createXML = require('./soc/agendamento/gerarxml')
const ajustaTipoExame = require('./soc/agendamento/ajustaTipoExame')
const sendSoapSchedule = require('./soc/agendamento/soapAgendamento');
const Gemini = require('./gemini/gemini');


const app = express();
const PORT = process.env.PORT || 3001;
 
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Serviço de webhook online!');
})




app.post('/', async (req, res) => {
    cadastrarAgendamento()
})



const MOCK =  {
    codEmpresa: '',
    codFuncionario: '',
    codTipoExame: '',
    codSequencial: '',
    nome: 'Luiza de Carvalho Motta Vaz',
    cpf: '',
    dataNascimento: '',    
    cnpj: '07.362.794/0001-82',      
    data: '23/12/2024',
    horario: '10:30',
    tipoExame: 'PERIODICO',
    cargo: '',
    setor: '',
    solicitacaoAtividades: undefined,
    observacoes: '',
    perfil: 'CREDENCIADAS',
    razaoSocial: 'GRUPO MAST'
  }



cadastrarAgendamento()
async function cadastrarAgendamento() {
    //let agendamento = MOCK
    let agendamento = await getSubmissionForm()
    
    agendamento = await ajustaTipoExame(agendamento)
    agendamento = await getCompanyCode(agendamento)
    
    if(agendamento.perfil == 'CLIENTES'){
        agendamento = await getEmployeeCode(agendamento)
    }

    // soap agendamento
    createXML(agendamento)

} 


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
