const express = require('express');
const getSubmissionForm = require('./jotform/jotform')

const app = express();
const PORT = process.env.PORT || 3001;
 
// app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Serviço de webhook online!');
// })

// app.post('/', async (req, res) => {
    
// })

const agendamento = getSubmissionForm()


 


// app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 