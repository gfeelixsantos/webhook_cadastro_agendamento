const express = require('express');
const getSubmissionForm = require('./jotform/jotform')

// agendamento
const getCompanyCode = require('./soc/agendamento/empresa')
const getEmployeeCode = require('./soc/agendamento/funcionario')
const ajustaTipoExame = require('./soc/agendamento/ajustaTipoExame')
const soapAgendamento = require('./soc/agendamento/soapAgendamento')


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
    nome: 'TESTE',
    cpf: '',
    dataNascimento: '',    
    cnpj: '44.370.632/0001-12',      
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




async function cadastrarAgendamento() {
    try {
        // let agendamento = MOCK
        let agendamento = await getSubmissionForm()
        
        agendamento = await ajustaTipoExame(agendamento)
        agendamento = await getCompanyCode(agendamento)
        console.info(agendamento)
        if(agendamento.perfil == 'CLIENTES')
        {
            agendamento = await getEmployeeCode(agendamento)
        }

        await soapAgendamento(agendamento)


    } catch (error) {
        console.error(error)
    }

} 


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
