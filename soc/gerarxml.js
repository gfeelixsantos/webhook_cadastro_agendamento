const WSSecurity = require('wssecurity-soap') 

function createXML(agendamento) {

    const user = "U1591737";
    const pass = "b2af7deb4b52a1ed92be6cfb0ae50faa35b651af";
    const header = new WSSecurity(user, pass, 'PasswordDigest')

    const agendas =  [
        // '00239781', //AGENDA CMSO
        // '02113649', //AGENDA CORDEIRÓPOLIS
        '01447495'  //AGENDA TESTE
    ]

    try {
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
                    <data>${agendamento.data.day}/${agendamento.data.month}/${agendamento.data.year}</data>
                    <horaInicial>${agendamento.horario}</horaInicial>
                    <horaFinal></horaFinal>
                    <codigoCompromisso>22</codigoCompromisso>
                    <usaOutroCompromisso></usaOutroCompromisso>
                    <conteudoOutroCompromisso></conteudoOutroCompromisso>
                    <tipoCompromisso>${agendamento.tipoExame}</tipoCompromisso>
                    <detalhes>SOLICITAÇÃO ATIVIDADES:${agendamento.solicitacaoAtividades} - OBSERVAÇÕES:${agendamento.observacoes}</detalhes>
                    <codigoProfissionalAgenda></codigoProfissionalAgenda>
                    <horarioChegada></horarioChegada>
                    <horarioSaida></horarioSaida>
                    <priorizarAtendimento></priorizarAtendimento>
                    <atendido>AGUARDANDO</atendido>
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
        console.log(modeloXML, 'XML GERADO COM SUCESSO!');
        return modeloXML
        
    } catch (error) {
        console.log('Erro ao gerar XML (fn: createXML)', error);
    }
}

module.exports = createXML