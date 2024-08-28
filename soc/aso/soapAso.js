const axios = require('axios')
const urlEndPoint = 'https://ws1.soc.com.br/WSSoc/services/ResultadoExamesWs?wsdl'

function sendSoapAso(xml) {
    // Make a POST request using Axios
    axios.post(urlEndPoint, xml, {
        headers: { 
            'Content-Type': 'text/xml',
        }
    })
    .then(response => {
        return console.log('SOAP RISCOS ASO:', response.status);
    })
    .catch(error => {
        return console.error('SOAP Error ASO:', error);
    });
    
}

module.exports = sendSoapAso