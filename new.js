require('dotenv').config()
const express = require('express');
const formulariosRecebidos = require('./jotform/formulariosRecebidos')
const exameAdmissional = require('./tiposExames/admissional')
const examePeriodico = require('./tiposExames/periodico')

const mock = require('./mock')

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3001;
 


app.get('/', (req, res) => {
    res.send('Serviço de webhook online!');
})

app.post('/', async (req, res) => {
    start()
    
})
start()
async function start() {
    let agendamento = await formulariosRecebidos()
    console.log(agendamento)

    if (agendamento.tipoExame == 'ADMISSIONAL'){
        exameAdmissional(agendamento)
            .catch( (err) => console.log(err))
            .finally(() => console.log( '--------------------------------------------------------------------- >> Agendamento Finalizado!'))
    }
    else {
        examePeriodico(agendamento)
            .catch( (err) => console.log(err))
            .finally(() => console.log( '--------------------------------------------------------------------- >> Agendamento Finalizado!'))
    } 

}


 


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 