const WSSecurity = require('wssecurity-soap') 
const axios = require('axios')
const comunicaErro = require('../../util/comunicaErro')

async function agenda(agendamento) {

    const user = process.env.WEBSERVICE_USER
    const pass = process.env.WEBSERVICE_PASS
    const header = new WSSecurity(user, pass, 'PasswordDigest')
    const URL = 'https://ws1.soc.com.br/WSSoc/AgendamentoWs?wsdl'

    const agendas =  [
        '239781',       //AGENDA CMSO
        // '2113649', //AGENDA CORDEIRÓPOLIS
        //'1447495'  //AGENDA TESTE
    ]


    const xml = 
        `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.soc.age.com/">
        <soapenv:Header>
            ${header.toXML()}
        </soapenv:Header>
        <soapenv:Body>
            <ser:incluirAgendamento>
            <IncluirAgendamentoWsVo>
                <identificacaoWsVo>
                    <codigoEmpresaPrincipal>16459</codigoEmpresaPrincipal>
                    <codigoResponsavel>6217</codigoResponsavel>
                    <codigoUsuario>1591737</codigoUsuario>
                </identificacaoWsVo>
                <dadosAgendamentoWsVo>
                    <tipoBuscaEmpresa>CODIGO_SOC</tipoBuscaEmpresa>
                    <codigoEmpresa>${agendamento.codEmpresa}</codigoEmpresa>
                    <reservarCompromissoParaEmpresa></reservarCompromissoParaEmpresa>
                    <tipoBuscaFuncionario>CODIGO_SOC</tipoBuscaFuncionario>
                    <codigoFuncionario>${agendamento.codFuncionario}</codigoFuncionario>
                    <codigoUsuarioAgenda>${agendas[0]}</codigoUsuarioAgenda>
                    <data>${agendamento.dataAgendamento}</data>
                    <horaInicial>${agendamento.horarioAgendamento}</horaInicial>
                    <horaFinal></horaFinal>
                    <codigoCompromisso>22</codigoCompromisso>
                    <usaOutroCompromisso></usaOutroCompromisso>
                    <conteudoOutroCompromisso></conteudoOutroCompromisso>
                    <tipoCompromisso>${agendamento.tipoExame}</tipoCompromisso>
                    <detalhes></detalhes>
                    <codigoProfissionalAgenda></codigoProfissionalAgenda>
                    <horarioChegada></horarioChegada>
                    <horarioSaida></horarioSaida>
                    <priorizarAtendimento></priorizarAtendimento>
                    <atendido>NAO</atendido>
                    <codigoMotivoCancelamento></codigoMotivoCancelamento>
                    <usaEnviarEmail></usaEnviarEmail>
                    <emailWsVo>
                        <data></data>
                        <hora></hora>
                        <email></email>
                    </emailWsVo>
                    <usaEnviarSocms></usaEnviarSocms>
                    <socmsWsVo>
                        <data></data>
                        <hora></hora>
                        <telefone></telefone>
                        <codigoMensagem></codigoMensagem>
                        <mensagem></mensagem>
                    </socmsWsVo>
                    <codigoPrestador>000033</codigoPrestador>
                </dadosAgendamentoWsVo>
            </IncluirAgendamentoWsVo>
            </ser:incluirAgendamento>

        </soapenv:Body>
        </soapenv:Envelope>
        `

        const options = {
            headers: { 
                'Content-Type': 'text/xml, charset=utf-8;',
            }
        }
        
        const response = await axios.post(URL, xml, options)

        if (response.status == 200){
            console.log('SOAP AGENDA:', response.status)
        }
        else {
            comunicaErro(agendamento, 'Erro ao registrar na agenda')
        }
}

module.exports = agenda