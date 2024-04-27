const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
 
app.use(express.json())

app.get('/', (req, res) => {
    res.send('ok');
})

app.post('/', (req, res) => {
    
    console.log('REQUISIÇÃO BODY', req.body);
    console.log('REQUISIÇÃO DATA', req.data);
    console.log('REQUISIÇÃO FILES', req.files);
    console.log('REQUISIÇÃO FILE', req.file);
    console.log('REQUISIÇÃO EVENT', req.event);
})


app.listen(PORT, () => console.log('Servidor rodando na porta: ', PORT));
 