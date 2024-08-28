const WSSecurity = require('wssecurity-soap') 

async function examRequestXml(agendamento) {

    const user = "U1591737";
    const pass = "b2af7deb4b52a1ed92be6cfb0ae50faa35b651af";
    const header = new WSSecurity(user, pass, 'PasswordDigest')

    const agendas =  [
        '239781', //AGENDA CMSO
        // '2113649', //AGENDA CORDEIRÓPOLIS
        //'1447495'  //AGENDA TESTE
    ]

    const campoAtividades = agendamento.solicitacaoAtividades == undefined ? '' : agendamento.solicitacaoAtividades
    const campoObservacoes = agendamento.observacoes == undefined ? '' : agendamento.observacoes
    const campoDetalhes = `
    ATIVIDADES: ${campoAtividades}
    OBSERVACOES: ${campoObservacoes}`


    try {
        const modeloXML = 
        `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.soc.age.com/">
        <soapenv:Header>
            ${header.toXML()}
        </soapenv:Header>
        <soapenv:Body>
        <ser:incluirPedidoExame>
            <PedidoExame>
                <identificacao>
                    <chaveAcesso>${pass}</chaveAcesso>
                    <codigoEmpresaPrincipal>16459</codigoEmpresaPrincipal>
                    <codigoResponsavel>6217</codigoResponsavel>
                    <homologacao></homologacao>
                    <codigoUsuario>1591737</codigoUsuario>
                </identificacao>
                <tipoBuscaEmpresa>CODIGO_SOC</tipoBuscaEmpresa>
                <codigoEmpresa>${agendamento.empresa.codEmpresa}</codigoEmpresa>
                <tipoBuscaFuncionario>CODIGO_SOC</tipoBuscaFuncionario>
                <codigoFuncionario>${agendamento.funcionario.codFuncionario}</codigoFuncionario>
                <dataFicha>${agendamento.dataAgendamento}</dataFicha>
                <tipoExame>${agendamento.exame.codTipoExame}</tipoExame>
                <exames>
                    ${await examsXmlCreate(agendamento)}
                </exames>
                <tipoBuscaMedico>CODIGO_SOC</tipoBuscaMedico>
                <codigoMedico></codigoMedico>
                <campoString01>${campoDetalhes}</campoString01>
            </PedidoExame>
        </ser:incluirPedidoExame>


        </soapenv:Body>
        </soapenv:Envelope>
        `
        
        return modeloXML
        
    } catch (error) {
        console.error('Erro ao gerar XML PEDIDO DE EXAME(fn: examRequestXml)', error);
    }
}

async function examsXmlCreate(agendamento) {
    let structure = ''
    
    agendamento.exame.listaExames.forEach( async (exame) => {

    structure +=
    `<exame>
        <codigo>${exame['CODIGOEXAME']}</codigo>
        <tipoBusca>CODIGO_SOC</tipoBusca>
        <codigoPrestador>${setProviderCode(exame)}</codigoPrestador>
        <tipoBuscaPrestador>CODIGO_SOC</tipoBuscaPrestador>
    </exame>
    `
    });

    return structure
}

function setProviderCode(exame) {

    // Raio-X (Veitieka)
    if(exame['CODIGOEXAME'] == '32050070' || exame['CODIGOEXAME'] == '14111' || exame['CODIGOEXAME'] == '12200' || exame['CODIGOEXAME'] == 'ex imagem' || exame['CODIGOEXAME'] == '111' || exame['CODIGOEXAME'] == '1v1v' || exame['CODIGOEXAME'] == '254477' || exame['CODIGOEXAME'] == '-0-' || exame['CODIGOEXAME'] == '0..' || exame['CODIGOEXAME'] == '2221111' || exame['CODIGOEXAME'] == '8998') {
        return 30
    }
    
    // Laboratorio: Antares após 12hrs senão Cedill
    if (exame['CODIGOEXAME'] == '2' || exame['CODIGOEXAME'] == 'XX' || exame['CODIGOEXAME'] == '28.15.001-5' || exame['CODIGOEXAME'] == '28.15.003-1' || exame['CODIGOEXAME'] == '28.15.004-0' || exame['CODIGOEXAME'] == '28.15.005-8' || exame['CODIGOEXAME'] == '28.15.006-6' || exame['CODIGOEXAME'] == '5555' || exame['CODIGOEXAME'] == '28010175' || exame['CODIGOEXAME'] == '28.15.009-0' || exame['CODIGOEXAME'] == '28.15.012-0' || exame['CODIGOEXAME'] == '1332' || exame['CODIGOEXAME'] == '1222' || exame['CODIGOEXAME'] == '00000' || exame['CODIGOEXAME'] == '28010507' || exame['CODIGOEXAME'] == '28.01.054-0' || exame['CODIGOEXAME'] == '02' || exame['CODIGOEXAME'] == '28100239' || exame['CODIGOEXAME'] == '28.15.030-9' || exame['CODIGOEXAME'] == '28.15.014-7' || exame['CODIGOEXAME'] == '22333' || exame['CODIGOEXAME'] == '002000' || exame['CODIGOEXAME'] == '28.01.095-7' || exame['CODIGOEXAME'] == '28.01.097-3' || exame['CODIGOEXAME'] == '13b' || exame['CODIGOEXAME'] == '2336' || exame['CODIGOEXAME'] == '28040350' || exame['CODIGOEXAME'] == '28011023' || exame['CODIGOEXAME'] == '28.04.048-1' || exame['CODIGOEXAME'] == '28040562' || exame['CODIGOEXAME'] == '28060105' || exame['CODIGOEXAME'] == '28060113' || exame['CODIGOEXAME'] == '28060067' || exame['CODIGOEXAME'] == '-' || exame['CODIGOEXAME'] == '144' || exame['CODIGOEXAME'] == '1123' || exame['CODIGOEXAME'] == '00022' || exame['CODIGOEXAME'] == '1125' || exame['CODIGOEXAME'] == '200' || exame['CODIGOEXAME'] == '28.15.018-0' || exame['CODIGOEXAME'] == '1' || exame['CODIGOEXAME'] == '54778844' || exame['CODIGOEXAME'] == '28030141' || exame['CODIGOEXAME'] == '0101' || exame['CODIGOEXAME'] == '28.13.036-7' || exame['CODIGOEXAME'] == '47788855' || exame['CODIGOEXAME'] == '28061004' || exame['CODIGOEXAME'] == '09022023' || exame['CODIGOEXAME'] == '02020' || exame['CODIGOEXAME'] == '1 b' || exame['CODIGOEXAME'] == '28.01.136-8' || exame['CODIGOEXAME'] == '28.01.137-6' || exame['CODIGOEXAME'] == '28011392' || exame['CODIGOEXAME'] == '28.01.141-4')
    {
        return 32
    }

    else return 33
}

module.exports = examRequestXml