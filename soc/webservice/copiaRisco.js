const WSSecurity = require('wssecurity-soap') 
const axios = require('axios')

async function webserviceCopiaRisco(agendamento, risco) {

    const user = process.env.WEBSERVICE_USER
    const pass = process.env.WEBSERVICE_PASS
    const header = new WSSecurity(user, pass, 'PasswordDigest')
    const URL = 'https://ws1.soc.com.br/WSSoc/RiscoWs?wsdl'

    
        const xml = 
        `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.soc.age.com/">
        <soapenv:Header>
            ${header.toXML()}
        </soapenv:Header>
        <soapenv:Body>
            <ser:copiarRisco>
                <CopiarRiscoWsVo>
                    <identificacaoWsVo>
                        <codigoEmpresaPrincipal>${ process.env.WEBSERVICE_CODPRINCIAL }</codigoEmpresaPrincipal>
                        <codigoResponsavel>${ process.env.WEBSERVICE_RESPONSAVEL }</codigoResponsavel>
                        <codigoUsuario>${ process.env.WEBSERVICE_CODUSUARIO }</codigoUsuario>
                    </identificacaoWsVo>
                    <codigoEmpresa>${ agendamento.codEmpresa }</codigoEmpresa>
                    <tipoBuscaEmpresa>CODIGO_SOC</tipoBuscaEmpresa>
                    <codigoRisco>${ risco.codRisco }</codigoRisco>
                    <tipoBuscaRisco>CODIGO_SOC</tipoBuscaRisco>

                    <dadosCopiaRiscoWsVo>
                        <copiarExame>true</copiarExame>
                    </dadosCopiaRiscoWsVo>
                </CopiarRiscoWsVo>
            </ser:copiarRisco>
        </soapenv:Body>
        </soapenv:Envelope>`

        
    const options = {
        headers: { 
            'Content-Type': 'text/xml',
        }
    }

    const response = await axios.post(URL, xml, options)

    if (response.status == 200){
        console.log('SOAP COPIA_RISCO:', response.status)
    }
    else {
        console.error('ERRO COPIA_RISCO:', response.data)
    }
}

module.exports = webserviceCopiaRisco