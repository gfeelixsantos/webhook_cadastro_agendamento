const WSSecurity = require('wssecurity-soap') 

function resultsXML(agendamento, index) {

    const user = "U1591737";
    const pass = "b2af7deb4b52a1ed92be6cfb0ae50faa35b651af";
    const header = new WSSecurity(user, pass, 'PasswordDigest')

    const agendas =  [
        //'239781', //AGENDA CMSO
        // '2113649', //AGENDA CORDEIRÓPOLIS
        '1447495'  //AGENDA TESTE
    ]

    const referencialSequencial = agendamento.codTipoExame != 1 ? 'SEQUENCIAL' : 'REFERENCIAL'


    try {
        const modeloXML = 
        `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.soc.age.com/">
        <soapenv:Header>
            ${header.toXML()}
        </soapenv:Header>
        <soapenv:Body>
            <ser:resultadoExamesPorCodigoSequencial>
            
                <resultadoExame>
                
                    <examesIdentificacaoPorIdWsVo>
                        <codigoIdFicha>${agendamento.codSequencial}</codigoIdFicha>
                        <codigoIdResultadoExame>${agendamento.listaExames[index]['SEQUENCIALRESULTADO']}</codigoIdResultadoExame>
                    </examesIdentificacaoPorIdWsVo>
                    
                    <identificacaoWsVo>
                        <chaveAcesso>${pass}</chaveAcesso>
                        <codigoEmpresaPrincipal>16459</codigoEmpresaPrincipal>
                        <codigoResponsavel>6217</codigoResponsavel>
                        <homologacao></homologacao>
                        <codigoUsuario>1591737</codigoUsuario>
                    </identificacaoWsVo>
                    
                    <resultadoExamesDadosWsVo>
                        <alteraFichaClinica></alteraFichaClinica>
                        <codigoExame>${agendamento.listaExames[index]['CODIGOEXAME']}</codigoExame>
                        <codigoExaminador></codigoExaminador>
                        <codigoExaminador2></codigoExaminador2>
                        <codigoPrestador></codigoPrestador>
                        <comentario></comentario>
                        <criaExame></criaExame>
                        <criaFichaClinica></criaFichaClinica>
                        <dataResultadoExame>${agendamento.data.day}/${agendamento.data.month}/${agendamento.data.year}</dataResultadoExame>
                        
                        
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
                        
                        <resultadoReferencialSequencial>${referencialSequencial}</resultadoReferencialSequencial>
                        <sobrepoeResultadoExistente>true</sobrepoeResultadoExistente>
        
                        
                        <cnpjLaboratorio></cnpjLaboratorio>
                        <codigoExameLaboratorial></codigoExameLaboratorial>
                        <ordemExameEsocial></ordemExameEsocial>
                        <dataAgendamento>${agendamento.data.day}/${agendamento.data.month}/${agendamento.data.year}</dataAgendamento>
                        <horaAgendamento>${agendamento.horario}</horaAgendamento>
                    </resultadoExamesDadosWsVo>
                    
                    <resultadoExamesIdentificacaoFuncionarioWsVo>
                        
                        <codigoEmpresa>${agendamento.codEmpresa}</codigoEmpresa>
                        <codigoFuncionario>${agendamento.codFuncionario}</codigoFuncionario>
                        <dataFicha></dataFicha>
                        <tipoeExame></tipoeExame>
                    </resultadoExamesIdentificacaoFuncionarioWsVo>
                </resultadoExame>
            </ser:resultadoExamesPorCodigoSequencial>


        </soapenv:Body>
        </soapenv:Envelope>
        `
        console.log('XML ALTERA RESULTADO GERADO COM SUCESSO!');
        return modeloXML
        
    } catch (error) {
        console.log('Erro ao gerar XML ASO(fn: resultsXML)', error);
    }
}

module.exports = resultsXML