const express = require('express');
const getSubmissionForm = require('./jotform')
const app = express();
const PORT = process.env.PORT || 3001;
 
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Serviço de webhook online!');
})

app.post('/', (req, res) => {
    getSubmissionForm()
})


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 