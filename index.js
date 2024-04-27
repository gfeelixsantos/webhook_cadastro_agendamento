const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
 
app.get('/', (req, res) => {
    res.send('ok');
})

app.post('/', (req, res) => {
    console.log('REQUISIÇÃO', req.body);
})


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 