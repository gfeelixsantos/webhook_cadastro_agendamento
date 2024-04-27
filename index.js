const express = require('express')
const app = express()
var porta = process.env.PORT_APP || 3001
 
app.get('/', (req, res) => {
    res.send('ok')
})
 
 
console.log('Servidor rodando na porta: '+ porta)