const axios = require('axios')
const urlEndPoint = 'https://ws1.soc.com.br/WSSoc/AgendamentoWs'

function sendSoapSchedule(xml) {
    // Make a POST request using Axios
    axios.post(urlEndPoint, xml, {
        headers: { 
            'Content-Type': 'text/xml',
        }
    })
    .then(response => {
        return console.log('SOAP cadastrar agendamento:', response.data);
    })
    .catch(error => {
        return console.error('SOAP Error cadastrar agendamento:', error);
    });
    
}

module.exports = sendSoapSchedule