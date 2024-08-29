require('dotenv').config()
const express = require('express');
const formulariosRecebidos = require('./jotform/formulariosRecebidos')
const exameAdmissional = require('./tiposExames/admissional')

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3001;
 


app.get('/', (req, res) => {
    res.send('Serviço de webhook online!');
})

app.post('/', async (req, res) => {
    
})

async function start() {
    let agendamento = await formulariosRecebidos()
    
    
    switch (agendamento.tipoExame) {
        case 'ADMISSIONAL':
            agendamento = exameAdmissional(agendamento)
            break;

        case 'PERIÓDICO':
            console.log('exame periodico')
            break;
    
        
    }
    console.log(agendamento);
}
start()

 


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 