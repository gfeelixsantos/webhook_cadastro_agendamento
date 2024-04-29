const axios = require('axios')
const urlEndPoint = 'https://ws1.soc.com.br/WSSoc/AgendamentoWs'

function soapIncluir(xml) {
    // Make a POST request using Axios
    axios.post(urlEndPoint, xml, {
        headers: { 
            'Content-Type': 'text/xml',
        }
    })
    .then(response => {
        return console.log('SOAP Response:', response.status);
    })
    .catch(error => {
        return console.error('SOAP Error:', error);
    });
    
}

module.exports = soapIncluir