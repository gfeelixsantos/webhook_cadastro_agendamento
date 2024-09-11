require('dotenv').config()
const express = require('express');
const formulariosRecebidos = require('./jotform/formulariosRecebidos')
const exameAdmissional = require('./tiposExames/admissional')
const enviarEmail = require('./nodemailer/index')


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

    exameAdmissional(agendamento)
        .catch( (err) => console.log(err, 'Erro de agendamento!'))
        .finally(() => console.log( '--------------------------------------------------------------------- >> Agendamento Finalizado!'))
    
    // switch (agendamento.tipoExame) {
    //     case 'ADMISSIONAL':
    //         agendamento = exameAdmissional(agendamento)
    //         break;

    //     case 'PERIÓDICO':
    //         console.log('exame periodico...')
    //         break;
    
        
    // }
    
}


 


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 