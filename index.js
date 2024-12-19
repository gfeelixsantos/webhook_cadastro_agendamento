const express = require('express');
const getSubmissionForm = require('./jotform/jotform')

// agendamento
const getCompanyCode = require('./soc/agendamento/empresa')
const getEmployeeCode = require('./soc/agendamento/funcionario')
const createXML = require('./soc/agendamento/gerarxml')
const ajustaTipoExame = require('./soc/agendamento/ajustaTipoExame')
const sendSoapSchedule = require('./soc/agendamento/soapAgendamento')

// funcionario modelo2
const webserviceFuncionarioModelo2 = require('./soc/funcionario/funcionarioModelo2')

// hierarquia
const hierarquiaEmpresa = require('./soc/hierarquia/hierarquiaEmpresa')

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

const MOCK =  {
    codEmpresa: '1804775',
    codFuncionario: '',
    codTipoExame: 2,
    codSequencial: '',
    riscos: [],
    nome: 'NOVO TESTE',
    cpf: '101.402.386-62',
    dataNascimento: '21/10/1991',    
    cnpj: '41.449.329/0001-11',      
    data: '19/12/2024',
    horario: '14:15',
    tipoExame: 'PERIODICO',
    cargo: 'ASS comercial',
    setor: 'comercial',
    solicitacaoAtividades: undefined,
    observacoes: 'campo observacao',
    perfil: 'CLIENTES',
    razaoSocial: 'PREVER TESTE'
  }

dev()
async function dev() {
    let agendamento = await getSubmissionForm()
    // let agendamento = MOCK
    
    if(agendamento.perfil == 'CLIENTES'){
        
        agendamento = await ajustaTipoExame(agendamento)
        agendamento = await getCompanyCode(agendamento)
        agendamento = await getEmployeeCode(agendamento)
        
        // Se não houver código do funcionario, adiciona no cadastro.
        if( agendamento.procedimento == 'ADICIONAR')
        {   
            agendamento = await hierarquiaEmpresa(agendamento)
            await webserviceFuncionarioModelo2(agendamento)
            await timer()
        }

        // soap agendamento
        let xml = await createXML(agendamento)
        await sendSoapSchedule(xml)
        
        
    }
    else {
        console.log('atendimento credenciadas....');
    }

} 


async function timer() {
    return await new Promise((resolve) => setTimeout(resolve, 2500));
}


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
