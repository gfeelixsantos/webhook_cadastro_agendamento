const axios = require('axios')
const urlEndPoint = 'https://ws1.soc.com.br/WSSoc/services/ResultadoExamesWs?wsdl'

function sendSoapExamRequest(xml) {
    // Make a POST request using Axios
    axios.post(urlEndPoint, xml, {
        headers: { 
            'Content-Type': 'text/xml',
        }
    })
    .then(response => {
        return console.log('SOAP EXAME:', response.data);
    })
    .catch(error => {
        return console.error('SOAP Error EXAME:', error);
    });
    
}

module.exports = sendSoapExamRequest