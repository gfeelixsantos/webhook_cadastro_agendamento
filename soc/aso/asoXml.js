const WSSecurity = require('wssecurity-soap') 

function asoCreateXML(agendamento) {

    const user = "U1591737";
    const pass = "b2af7deb4b52a1ed92be6cfb0ae50faa35b651af";
    const header = new WSSecurity(user, pass, 'PasswordDigest')

    const agendas =  [
        '239781', //AGENDA CMSO
        // '2113649', //AGENDA CORDEIRÓPOLIS
        //'1447495'  //AGENDA TESTE
    ]

    const medico = agendamento.listaExames.length > 3 ? 'Dra. Andrea Cristina Defina do Amaral' : ''
    const codDra = agendamento.listaExames.length > 3 ? '1' : ''

    try {
        const modeloXML = 
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
                    <codigoPessoaEmissorAso>${codDra}</codigoPessoaEmissorAso>
                    <codigoSequencialFichaclinica>${agendamento.codSequencial}</codigoSequencialFichaclinica>
                    <comentarioAso></comentarioAso>
                    <conselhoClasse></conselhoClasse>
                    <dataEmissaoAso>${agendamento.data.day}/${agendamento.data.month}/${agendamento.data.year}</dataEmissaoAso>
                    <dataFicha>${agendamento.data.day}/${agendamento.data.month}/${agendamento.data.year}</dataFicha>
                    <especialidade></especialidade>
                    
                    <identificacaoWsVo>
                        <chaveAcesso>${pass}</chaveAcesso>
                        <codigoEmpresaPrincipal>16459</codigoEmpresaPrincipal>
                        <codigoResponsavel>6217</codigoResponsavel>
                        <homologacao></homologacao>
                        <codigoUsuario>1591737</codigoUsuario>
                    </identificacaoWsVo>
                    <imprimeAsoComExamesNaoPertencentesaFicha></imprimeAsoComExamesNaoPertencentesaFicha>
                    <inativaFunconarioExameDemissional>true</inativaFunconarioExameDemissional>
                    <listaRiscosWsVo>
                        ${addRisk(agendamento)}
                    </listaRiscosWsVo>


                    <medicoAsoEResponsavelPelaFicha>true</medicoAsoEResponsavelPelaFicha>
                    <nomeMedicoEmissorAso>${medico}</nomeMedicoEmissorAso>
                    
                    <parecerAso>APTO</parecerAso>
                    <parecerTrabalhoEmAltura>APTO</parecerTrabalhoEmAltura>
                    <parecerTrabalhoEspacoConfinado>APTO</parecerTrabalhoEspacoConfinado>
                    <telefoneResponsavelAso></telefoneResponsavelAso>
                    <textoLivreValidade></textoLivreValidade>
                    <tipoeExame>${agendamento.codTipoExame}</tipoeExame>
                    
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
        </soapenv:Envelope>
        `
        console.log('XML ASO GERADO COM SUCESSO!');
        return modeloXML
        
    } catch (error) {
        console.log('Erro ao gerar XML ASO(fn: asoCreateXXML)', error);
    }
}

function addRisk(agendamento) {
    let structure = ''

    if( agendamento.riscos.length > 0 ){
        agendamento.riscos.forEach( risco => {
            structure +=
            `<listaCodigoRiscos>${risco}</listaCodigoRiscos>
            <tipoBuscaRiscos>CODIGO_SOC</tipoBuscaRiscos>
            `
        })
    }
    else {
        structure +=
        `<listaCodigoRiscos>83</listaCodigoRiscos>
        <tipoBuscaRiscos>CODIGO_SOC</tipoBuscaRiscos>
        `
    }
    return structure
}

module.exports = asoCreateXML