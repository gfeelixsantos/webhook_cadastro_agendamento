const WSSecurity = require('wssecurity-soap') 
const axios = require('axios')
const comunicaErro = require('../../util/comunicaErro')

async function webserviceIncluiAso(agendamento) {

    const user = process.env.WEBSERVICE_USER
    const pass = process.env.WEBSERVICE_PASS
    const header = new WSSecurity(user, pass, 'PasswordDigest')
    const URL = 'https://ws1.soc.com.br/WSSoc/services/ResultadoExamesWs?wsdl'

    const xml = 
        `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.soc.age.com/">
        <soapenv:Header>
            ${header.toXML()}
        </soapenv:Header>
        <soapenv:Body>
            <ser:incluiDadosAso>
                <aso>
                    <codigoEmpresa>${agendamento.codEmpresa}</codigoEmpresa>
                    <codigoFuncionario>${agendamento.codFuncionario}</codigoFuncionario>
                    <codigoPessoaEmissorAso></codigoPessoaEmissorAso>
                    <codigoSequencialFichaclinica>${agendamento.idFicha}</codigoSequencialFichaclinica>
                    <comentarioAso></comentarioAso>
                    <conselhoClasse></conselhoClasse>
                    <dataEmissaoAso>${agendamento.dataAgendamento}</dataEmissaoAso>
                    <dataFicha>${agendamento.dataAgendamento}</dataFicha>
                    <especialidade></especialidade>
                    
                    <identificacaoWsVo>
                        <chaveAcesso>${ process.env.WEBSERVICE_PASS }</chaveAcesso>
                        <codigoEmpresaPrincipal>${ process.env.WEBSERVICE_CODPRINCIAL }</codigoEmpresaPrincipal>
                        <codigoResponsavel>${ process.env.WEBSERVICE_RESPONSAVEL }</codigoResponsavel>
                        <homologacao></homologacao>
                        <codigoUsuario>${ process.env.WEBSERVICE_CODUSUARIO }</codigoUsuario>
                    </identificacaoWsVo>

                    <imprimeAsoComExamesNaoPertencentesaFicha>true</imprimeAsoComExamesNaoPertencentesaFicha>
                    <inativaFunconarioExameDemissional>true</inativaFunconarioExameDemissional>

                    <listaRiscosWsVo>
                        ${adicionarRisco(agendamento)}
                    </listaRiscosWsVo>


                    <medicoAsoEResponsavelPelaFicha>true</medicoAsoEResponsavelPelaFicha>
                    <nomeMedicoEmissorAso></nomeMedicoEmissorAso>
                    
                    <parecerAso>APTO</parecerAso>
                    <parecerTrabalhoEmAltura>APTO</parecerTrabalhoEmAltura>
                    <parecerTrabalhoEspacoConfinado>APTO</parecerTrabalhoEspacoConfinado>
                    <telefoneResponsavelAso>${ agendamento.telefoneSolicitante }</telefoneResponsavelAso>
                    <textoLivreValidade></textoLivreValidade>
                    <tipoeExame>${ agendamento.codTipoExame }</tipoeExame>
                    
                    <UFConselho></UFConselho>
                    
                    
                    <desconsideraAsoEsocial>false</desconsideraAsoEsocial>
                </aso>
            </ser:incluiDadosAso>

        </soapenv:Body>
        </soapenv:Envelope>`

        const options = {
            headers: { 
                'Content-Type': 'text/xml, charset=utf-8;',
            }
        }
    
        const response = await axios.post(URL, xml, options)
    
        if (response.status == 200){
            console.log('SOAP ASO:', response.status)
        }
        else {
            console.error('ERRO ASO:', response.data)
            comunicaErro(agendamento, response.data)
        }
}

function adicionarRisco(agendamento) {
    let structure = ''

    if( agendamento.riscos.length > 0 ){
        agendamento.riscos.forEach( risco => {
            structure +=
            `<listaCodigoRiscos>${ risco["codRisco"] }</listaCodigoRiscos>
            <tipoBuscaRiscos>CODIGO_SOC</tipoBuscaRiscos>
            `
        })
    }

    return structure
}

module.exports = webserviceIncluiAso