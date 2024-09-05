const WSSecurity = require('wssecurity-soap') 
const axios = require('axios')
const Atendimento = require('../../aws/schema')
const enviarEmail = require('../../nodemailer/index')

async function webservicePedidoExame(agendamento) {

    const user = process.env.WEBSERVICE_USER
    const pass = process.env.WEBSERVICE_PASS
    const header = new WSSecurity(user, pass, 'PasswordDigest')
    const URL = 'https://ws1.soc.com.br/WSSoc/services/ResultadoExamesWs?wsdl'


    const xml = 
        `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.soc.age.com/">
        <soapenv:Header>
            ${header.toXML()}
        </soapenv:Header>
        <soapenv:Body>
        <ser:incluirPedidoExame>
            <PedidoExame>
                <identificacao>
                    <chaveAcesso>${ process.env.WEBSERVICE_PASS }</chaveAcesso>
                    <codigoEmpresaPrincipal>${ process.env.WEBSERVICE_CODPRINCIAL }</codigoEmpresaPrincipal>
                    <codigoResponsavel>${ process.env.WEBSERVICE_RESPONSAVEL }</codigoResponsavel>
                    <homologacao></homologacao>
                    <codigoUsuario>${ process.env.WEBSERVICE_CODUSUARIO }</codigoUsuario>
                </identificacao>
                <tipoBuscaEmpresa>CODIGO_SOC</tipoBuscaEmpresa>
                <codigoEmpresa>${agendamento.codEmpresa}</codigoEmpresa>
                <tipoBuscaFuncionario>CODIGO_SOC</tipoBuscaFuncionario>
                <codigoFuncionario>${agendamento.codFuncionario}</codigoFuncionario>
                <dataFicha>${agendamento.dataAgendamento}</dataFicha>
                <tipoExame>${agendamento.codTipoExame}</tipoExame>
                <exames>
                    ${ adicionarExames(agendamento) }
                </exames>
                <tipoBuscaMedico>CODIGO_SOC</tipoBuscaMedico>
                <codigoMedico></codigoMedico>
            </PedidoExame>
        </ser:incluirPedidoExame>


        </soapenv:Body>
        </soapenv:Envelope>`

        const options = {
            headers: { 
                'Content-Type': 'text/xml',
            }
        }

        const response = await axios.post(URL, xml, options)
        const responseMensagem = response.data.split('mensagem')[1]
        
        if (responseMensagem.includes('ERRO') || response.status != 200){
            agendamento.status = 'ERRO'
            agendamento.erros.push(responseMensagem)
            
            await Atendimento.delete(agendamento.id)
            await new Atendimento(agendamento).save()
    
            enviarEmail(agendamento)
            
            throw new Error('Erro Webservice, Inclui Pedido de Exame')
        }
        else {
            console.error('SOAP PEDIDO_EXAME:', response.status)
        }
}

function adicionarExames(agendamento) {
    let structure = ''
    
    agendamento.exames.forEach( exame => {

    structure +=
    `<exame>
        <codigo>${exame['codigo']}</codigo>
        <tipoBusca>CODIGO_SOC</tipoBusca>
        <codigoPrestador>${adicionaPrestador(exame)}</codigoPrestador>
        <tipoBuscaPrestador>CODIGO_SOC</tipoBuscaPrestador>
    </exame>
    `
    });

    return structure
}




function adicionaPrestador(exame) {

    // Raio-X (Veitieka)
    if(exame["codigo"] == '32050070' || exame["codigo"] == '14111' || exame["codigo"] == '12200' || exame["codigo"] == 'ex imagem' || exame["codigo"] == '111' || exame["codigo"] == '1v1v' || exame["codigo"] == '254477' || exame["codigo"] == '-0-' || exame["codigo"] == '0..' || exame["codigo"] == '2221111' || exame["codigo"] == '8998') {
        return 30
    }
    
    // Cedill
    if (exame["codigo"] == '2' || exame["codigo"] == 'XX' || exame["codigo"] == '28.15.001-5' || exame["codigo"] == '28.15.003-1' || exame["codigo"] == '28.15.004-0' || exame["codigo"] == '28.15.005-8' || exame["codigo"] == '28.15.006-6' || exame["codigo"] == '5555' || exame["codigo"] == '28010175' || exame["codigo"] == '28.15.009-0' || exame["codigo"] == '28.15.012-0' || exame["codigo"] == '1332' || exame["codigo"] == '1222' || exame["codigo"] == '00000' || exame["codigo"] == '28010507' || exame["codigo"] == '28.01.054-0' || exame["codigo"] == '02' || exame["codigo"] == '28100239' || exame["codigo"] == '28.15.030-9' || exame["codigo"] == '28.15.014-7' || exame["codigo"] == '22333' || exame["codigo"] == '002000' || exame["codigo"] == '28.01.095-7' || exame["codigo"] == '28.01.097-3' || exame["codigo"] == '13b' || exame["codigo"] == '2336' || exame["codigo"] == '28040350' || exame["codigo"] == '28011023' || exame["codigo"] == '28.04.048-1' || exame["codigo"] == '28040562' || exame["codigo"] == '28060105' || exame["codigo"] == '28060113' || exame["codigo"] == '28060067' || exame["codigo"] == '-' || exame["codigo"] == '144' || exame["codigo"] == '1123' || exame["codigo"] == '00022' || exame["codigo"] == '1125' || exame["codigo"] == '200' || exame["codigo"] == '28.15.018-0' || exame["codigo"] == '1' || exame["codigo"] == '54778844' || exame["codigo"] == '28030141' || exame["codigo"] == '0101' || exame["codigo"] == '28.13.036-7' || exame["codigo"] == '47788855' || exame["codigo"] == '28061004' || exame["codigo"] == '09022023' || exame["codigo"] == '02020' || exame["codigo"] == '1 b' || exame["codigo"] == '28.01.136-8' || exame["codigo"] == '28.01.137-6' || exame["codigo"] == '28011392' || exame["codigo"] == '28.01.141-4')
    {
        return 32
    }

    //CMSO
    return 33
}



module.exports = webservicePedidoExame