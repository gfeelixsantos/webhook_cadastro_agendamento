const WSSecurity = require('wssecurity-soap')
const axios = require('axios')
const urlEndPoint = 'https://ws1.soc.com.br/WSSoc/AgendamentoWs'

function createXML(agendamento) {

    const agenda = '2934869'
    const codCompromisso = agendamento.perfil == 'CLIENTES' ? '6' : '5'
    const situacaoInicial = 'AGUARDANDO'
    const codPrestador = '000001'

    const campoAtividades = agendamento.solicitacaoAtividades == undefined ? '' : agendamento.solicitacaoAtividades
    const campoObservacoes = agendamento.observacoes == undefined ? '' : agendamento.observacoes
    const campoDetalhes = `
    ATIVIDADES: ${campoAtividades}
    OBSERVACOES: ${campoObservacoes}`

    const user = "U3058327";
    const pass = "3a73f6f721ed7683bec5aea6b5f67952089ab180";
    const codEmpresaPrincipal =  '941933'
    const codResponsavel = '1370280'
    const codUsuario = '3058327'

    const header = new WSSecurity(user, pass, 'PasswordDigest')

   
    const modeloXML = 
    `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.soc.age.com/">
    <soapenv:Header>
        ${header.toXML()}
    </soapenv:Header>
    <soapenv:Body>
        <ser:incluirAgendamento>
        <IncluirAgendamentoWsVo>
            <identificacaoWsVo>
                <codigoEmpresaPrincipal>${codEmpresaPrincipal}</codigoEmpresaPrincipal>
                <codigoResponsavel>${codResponsavel}</codigoResponsavel>
                <codigoUsuario>${codUsuario}</codigoUsuario>
            </identificacaoWsVo>
            <dadosAgendamentoWsVo>
                <tipoBuscaEmpresa>CODIGO_SOC</tipoBuscaEmpresa>
                <codigoEmpresa>${agendamento.codEmpresa}</codigoEmpresa>
                <reservarCompromissoParaEmpresa></reservarCompromissoParaEmpresa>
                <tipoBuscaFuncionario>CODIGO_SOC</tipoBuscaFuncionario>
                <codigoFuncionario>${agendamento.codFuncionario ? agendamento.codFuncionario : ''}</codigoFuncionario>
                <codigoUsuarioAgenda>${agenda}</codigoUsuarioAgenda>
                <data>${agendamento.data}</data>
                <horaInicial>${agendamento.horario}</horaInicial>
                <horaFinal></horaFinal>
                <codigoCompromisso>${codCompromisso}</codigoCompromisso>
                <usaOutroCompromisso></usaOutroCompromisso>
                <conteudoOutroCompromisso></conteudoOutroCompromisso>
                <tipoCompromisso>${agendamento.tipoExame}</tipoCompromisso>
                <detalhes>${campoDetalhes}</detalhes>
                <codigoProfissionalAgenda></codigoProfissionalAgenda>
                <horarioChegada></horarioChegada>
                <horarioSaida></horarioSaida>
                <priorizarAtendimento></priorizarAtendimento>
                <atendido>${situacaoInicial}</atendido>
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
                <codigoPrestador>${codPrestador}</codigoPrestador>
            </dadosAgendamentoWsVo>
        </IncluirAgendamentoWsVo>
        </ser:incluirAgendamento>

    </soapenv:Body>
    </soapenv:Envelope>
    `
    

    axios.post(urlEndPoint, modeloXML, {
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

module.exports = createXML