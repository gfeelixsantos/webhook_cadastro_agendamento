const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
 
app.use(express.json())

app.get('/', (req, res) => {
    res.send('ok');
})

app.post('/', (req, res) => {
    
    console.log('REQUISIÇÃO', req.headers);
    console.log('REQUISIÇÃO', req.rawHeaders);
})


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 