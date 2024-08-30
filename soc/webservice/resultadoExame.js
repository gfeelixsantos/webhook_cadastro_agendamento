const WSSecurity = require('wssecurity-soap') 
const axios = require('axios')
const timer = require('../../util/timer')

async function resultadoExame(agendamento) {
    
    const user = process.env.WEBSERVICE_USER
    const pass = process.env.WEBSERVICE_PASS
    const header = new WSSecurity(user, pass, 'PasswordDigest')
    const URL = "https://ws1.soc.com.br/WSSoc/services/ResultadoExamesWs?wsdl"

    const referencialSequencial = agendamento.codTipoExame != 1 ? 'SEQUENCIAL' : 'REFERENCIAL'
    let contador = 1

    for( let index = 0; index < agendamento.exames.length; index++  ){

        const xml = 
        `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.soc.age.com/">
        <soapenv:Header>
            ${header.toXML()}
        </soapenv:Header>
        <soapenv:Body>
            <ser:resultadoExamesPorCodigoSequencial>
            
                <resultadoExame>
                
                    <examesIdentificacaoPorIdWsVo>
                        <codigoIdFicha>${ agendamento.idFicha }</codigoIdFicha>
                        <codigoIdResultadoExame>${ agendamento.exames[index].sequencialResultado }</codigoIdResultadoExame>
                    </examesIdentificacaoPorIdWsVo>
                    
                    <identificacaoWsVo>
                        <chaveAcesso>${ process.env.WEBSERVICE_PASS }</chaveAcesso>
                        <codigoEmpresaPrincipal>${ process.env.WEBSERVICE_CODPRINCIAL }</codigoEmpresaPrincipal>
                        <codigoResponsavel>${ process.env.WEBSERVICE_RESPONSAVEL }</codigoResponsavel>
                        <homologacao></homologacao>
                        <codigoUsuario>${ process.env.WEBSERVICE_CODUSUARIO }</codigoUsuario>
                    </identificacaoWsVo>
                    
                    <resultadoExamesDadosWsVo>
                        <alteraFichaClinica></alteraFichaClinica>
                        <codigoExame>${ agendamento.exames[index].codigo }</codigoExame>
                        <codigoExaminador></codigoExaminador>
                        <codigoExaminador2></codigoExaminador2>
                        <codigoPrestador></codigoPrestador>
                        <comentario></comentario>
                        <criaExame></criaExame>
                        <criaFichaClinica></criaFichaClinica>
                        <dataResultadoExame>${ agendamento.dataAgendamento }</dataResultadoExame>
                        
                        
                        <identificarExameAlteradoAutomaticamente></identificarExameAlteradoAutomaticamente>
                        
                        <metodo></metodo>
                        
                        <nomeExame></nomeExame>
                        
                        <nomeExaminador3></nomeExaminador3>
                        
                        <nomeImagem></nomeImagem>
                        
                        <notaFiscal></notaFiscal>
                        
                        <resultado></resultado>
                        <resultadoAlterado></resultadoAlterado>
                        <resultadoAlteradoAgravamento></resultadoAlteradoAgravamento>
                        <resultadoAlteradoEmAnalise></resultadoAlteradoEmAnalise>
                        <resultadoAlteradoOcupacional></resultadoAlteradoOcupacional>
                        
                        <resultadoReferencialSequencial>${ referencialSequencial }</resultadoReferencialSequencial>
                        <sobrepoeResultadoExistente>true</sobrepoeResultadoExistente>
        
                        
                        <cnpjLaboratorio></cnpjLaboratorio>
                        <codigoExameLaboratorial></codigoExameLaboratorial>
                        <ordemExameEsocial></ordemExameEsocial>
                        <dataAgendamento>${ agendamento.dataAgendamento }</dataAgendamento>
                        <horaAgendamento>${ agendamento.horarioAgendamento }</horaAgendamento>
                    </resultadoExamesDadosWsVo>
                    
                    <resultadoExamesIdentificacaoFuncionarioWsVo>
                        
                        <codigoEmpresa>${ agendamento.codEmpresa }</codigoEmpresa>
                        <codigoFuncionario>${ agendamento.codFuncionario }</codigoFuncionario>
                        <dataFicha>${ agendamento.dataAgendamento }</dataFicha>
                        <tipoeExame></tipoeExame>
                    </resultadoExamesIdentificacaoFuncionarioWsVo>
                </resultadoExame>
            </ser:resultadoExamesPorCodigoSequencial>


        </soapenv:Body>
        </soapenv:Envelope>`

        const options = {
            headers: { 
                'Content-Type': 'text/xml',
            }
        }

        
        const response = await axios.post(URL, xml, options)
    
        if (response.status == 200){
            console.log(`SOAP RESULTADO_EXAME: ${ contador } / ${ agendamento.exames.length }`, response.status)
        }
        else {
            console.error(`ERRO RESULTADO_EXAME: ${ contador } / ${ agendamento.exames.length }`, response.data)
        }

        contador++
        await new Promise((resolve) => setTimeout(resolve, 30000))
    }
}

module.exports = resultadoExame