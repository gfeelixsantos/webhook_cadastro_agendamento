const WSSecurity = require('wssecurity-soap') 
const axios = require('axios')

async function webserviceIncluiAso(agendamento) {

    const user = process.env.WEBSERVICE_USER
    const pass = process.env.WEBSERVICE_PASS
    const header = new WSSecurity(user, pass, 'PasswordDigest')
    const URL = 'https://ws1.soc.com.br/WSSoc/services/ResultadoExamesWs?wsdl'


    // const medico = agendamento.listaExames.length > 3 ? 'Dra. Andrea Cristina Defina do Amaral' : ''
    // const codDra = agendamento.exame.listaExames.length > 3 ? '1' : '0'

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
                    <comentarioAso><h1>TESTE</h1></comentarioAso>
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


                    <medicoAsoEResponsavelPelaFicha>false</medicoAsoEResponsavelPelaFicha>
                    <nomeMedicoEmissorAso></nomeMedicoEmissorAso>
                    
                    <parecerAso>APTO</parecerAso>
                    <parecerTrabalhoEmAltura></parecerTrabalhoEmAltura>
                    <parecerTrabalhoEspacoConfinado></parecerTrabalhoEspacoConfinado>
                    <telefoneResponsavelAso>${ agendamento.telefoneSolicitante }</telefoneResponsavelAso>
                    <textoLivreValidade></textoLivreValidade>
                    <tipoeExame>${ agendamento.codTipoExame }</tipoeExame>
                    
                    <UFConselho></UFConselho>
                    
                    <pareceres>
                        <parecer>
                            <codigo></codigo>
                            <valor></valor>
                        </parecer>
                    </pareceres>
                    <desconsideraAsoEsocial>false</desconsideraAsoEsocial>
                </aso>
            </ser:incluiDadosAso>

        </soapenv:Body>
        </soapenv:Envelope>`

        const options = {
            headers: { 
                'Content-Type': 'text/xml',
            }
        }
    
        const response = await axios.post(URL, xml, options)
    
        if (response.status == 200){
            console.log('SOAP ASO:', response.status)
        }
        else {
            console.error('ERRO ASO:', response.data)
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