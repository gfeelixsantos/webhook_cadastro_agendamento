const WSSecurity = require('wssecurity-soap') 
const axios = require('axios')

function xmlFuncionarioModelo2(agendamento) {

    const user = "U1591737";
    const pass = "b2af7deb4b52a1ed92be6cfb0ae50faa35b651af";
    const header = new WSSecurity(user, pass, 'PasswordDigest')
    const URL = 'https://ws1.soc.com.br/WSSoc/FuncionarioModelo2Ws?wsdl'

    
        const xml = 
        `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.soc.age.com/">
        <soapenv:Header>
            ${header.toXML()}
        </soapenv:Header>
        <soapenv:Body>
            <ser:importacaoFuncionario>
                
                <Funcionario>
                    <atualizarCargo>false</atualizarCargo>
                    <atualizarFuncionario>true</atualizarFuncionario>
                    <atualizarSetor>false</atualizarSetor>
                    <atualizarUnidade>false</atualizarUnidade>
                    
                    <cargoWsVo>
                        <atualizaDescricaoRequisitosCargoPeloCbo></atualizaDescricaoRequisitosCargoPeloCbo>
                        <cbo></cbo>
                        <codigo>${agendamento.funcionario.codCargo}</codigo>
                        <codigoRh></codigoRh>
                        <descricaoDetalhada></descricaoDetalhada>
                        <descricaoLocal></descricaoLocal>
                        <educacao></educacao>
                        <experiencia></experiencia>
                        <funcao>${agendamento.funcionario.cargo}</funcao>
                        <gfip></gfip>
                        <habilidades></habilidades>
                        <localTrabalho></localTrabalho>
                        <materialUtilizado></materialUtilizado>
                        <mobiliarioUtilizado></mobiliarioUtilizado>
                        <nome>${agendamento.funcionario.cargo}</nome>
                        <nomeLegal>${agendamento.funcionario.codCargo}</nomeLegal>
                        <orientacaoAso></orientacaoAso>
                        <requisitosFuncao></requisitosFuncao>
                        <status></status>
                        <tipoBusca>CODIGO</tipoBusca>
                        <treinamento></treinamento>
                        
                        <atividadesPerigosasWsVo>
                            <codigoAtividadePerigosa></codigoAtividadePerigosa>
                        </atividadesPerigosasWsVo>
                        <criarHistoricoDescricao></criarHistoricoDescricao>
                    </cargoWsVo>
                    

                    <criarCargo></criarCargo>
                    <criarCentroCusto></criarCentroCusto>
                    <criarFuncionario>true</criarFuncionario>
                    <criarHistorico></criarHistorico>
                    <criarMotivoLicenca></criarMotivoLicenca>
                    <criarSetor></criarSetor>
                    <criarTurno></criarTurno>
                    <criarUnidade></criarUnidade>
                    <criarUnidadeContratante></criarUnidadeContratante>
                    

                    <destravarFuncionarioBloqueado></destravarFuncionarioBloqueado>
                    
                    <funcionarioWsVo>
                    
                        <autorizadoMensagemSms></autorizadoMensagemSms>
                        
                        <bairro></bairro>
                        <carteiraNacionalSaude></carteiraNacionalSaude>
                        <categoria>101</categoria>
                        <cep></cep>
                        <chaveProcuraFuncionario>CODIGO</chaveProcuraFuncionario>
                        <cidade></cidade>
                        <cipa></cipa>
                        <cipaDataFimMandato></cipaDataFimMandato>
                        <cipaDataInicioMandato></cipaDataInicioMandato>
                        <cnpjEmpresaFuncionario></cnpjEmpresaFuncionario>
                        <codigo>${agendamento.funcionario.codFuncionario}</codigo>
                        <codigoEmpresa>${agendamento.empresa.codEmpresa}</codigoEmpresa>
                        <codigoMunicipio></codigoMunicipio>
                        <complementoEndereco></complementoEndereco>
                        <contatoEmergencia></contatoEmergencia>
                        <cor></cor>
                        <cpf>${ agendamento.funcionario.cpf }</cpf>
                        <dataAdmissao>${agendamento.dataAgendamento}</dataAdmissao>
                        <dataAfastamento></dataAfastamento>
                        <dataDemissao></dataDemissao>
                        <dataDemissionalCarta></dataDemissionalCarta>
                        <dataEmissaoCtps></dataEmissaoCtps>
                        <dataFinalEstabilidade></dataFinalEstabilidade>
                        <dataNascimento>${agendamento.funcionario.dataNascimento}</dataNascimento>
                        <dataUltimaMovimentacao></dataUltimaMovimentacao>
                        <desabilitarRisco></desabilitarRisco>
                        <descricaoAtividade></descricaoAtividade>
                        <email></email>
                        <endereco></endereco>
                        <enderecoEmergencia></enderecoEmergencia>
                        <escolaridade></escolaridade>
                        <estado></estado>
                        <estadoCivil>SOLTEIRO</estadoCivil>
                        <funcao></funcao>
                        <funcaoBrigadaIncendio></funcaoBrigadaIncendio>
                        <gfip></gfip>
                        <historicoPPP></historicoPPP>
                        <matricula></matricula>
                        <naoPossuiCpf>${ agendamento.funcionario.cpf.includes('000') ? 'true' : 'false' }</naoPossuiCpf>
                        
                        <naoPossuiCtps></naoPossuiCtps>
                        
                        <naoPossuiMatricula></naoPossuiMatricula>
                        
                        <naoPossuiMatriculaRh></naoPossuiMatriculaRh>
                        
                        <naoPossuiPis></naoPossuiPis>
                        
                        <naturalidade></naturalidade>
                        
                        <nomeCooperativa></nomeCooperativa>
                        
                        <nomeFuncionario>${agendamento.funcionario.nome}</nomeFuncionario>
                        
                        <nomeMae></nomeMae>
                        
                        <nrCtps></nrCtps>
                        
                        <numeroEndereco></numeroEndereco>
                        
                        <observacaoAso>${agendamento.observacoes != undefined ? agendamento.observacoes : ''}</observacaoAso>
                        
                        <observacaoEstabilidade></observacaoEstabilidade>
                        
                        <observacaoPpp></observacaoPpp>
                        
                        <parentescoContatoEmergencia></parentescoContatoEmergencia>
                        
                        <pis></pis>
                        
                        <ramal></ramal>
                        
                        <ramalTelefoneEmergencia></ramalTelefoneEmergencia>
                        
                        <razaoSocialEmpresaFuncionario>${agendamento.empresa.razaoSocial}</razaoSocialEmpresaFuncionario>
                        
                        <regimeRevezamento></regimeRevezamento>
                        
                        <regimeTrabalho>NORMAL</regimeTrabalho>
                        
                        <remuneracaoMensal></remuneracaoMensal>
                        
                        <requisitosFuncao></requisitosFuncao>
                        
                        <rg>${agendamento.funcionario.rg}</rg>
                        
                        <rgDataEmissao></rgDataEmissao>
                        
                        <rgOrgaoEmissor></rgOrgaoEmissor>
                        
                        <rgUf></rgUf>
                        
                        <serieCtps></serieCtps>
                        
                        <sexo>${agendamento.funcionario.sexo}</sexo>
                        
                        <situacao>ATIVO</situacao>
                        
                        <telefoneCelular></telefoneCelular>
                        
                        <telefoneComercial></telefoneComercial>
                        
                        <telefoneEmergencia></telefoneEmergencia>
                        
                        <telefoneResidencial></telefoneResidencial>
                        
                        <telefoneSms></telefoneSms>
                        
                        <tipoBuscaEmpresa>CODIGO_SOC</tipoBuscaEmpresa>
                        
                        <tipoContratacao>CLT</tipoContratacao>
                        
                        <ufCtps></ufCtps>
                        
                        <utilizarDescricaoRequisitoCargo></utilizarDescricaoRequisitoCargo>
                        
                        <observacaoFuncionario></observacaoFuncionario>
                        
                        <codigoPaisNascimento></codigoPaisNascimento>
                        
                        <emailPessoal></emailPessoal>
                        
                        <matriculaRh></matriculaRh>
                        
                        <codigoCategoriaESocial>101</codigoCategoriaESocial>
                        
                        <genero></genero>
                        
                        <nomeSocial></nomeSocial>
                        
                        <tipoVinculo>EMPREGATICIO</tipoVinculo>
                        
                        <tipoAdmissao>ADMISSAO</tipoAdmissao>
                        
                        <nomePai></nomePai>
                        
                        <atividadesPerigosasWsVo>
                            <codigoAtividadePerigosa></codigoAtividadePerigosa>
                        </atividadesPerigosasWsVo>
                        
                        <tipoSanguineo></tipoSanguineo>
                        
                        <corDosOlhos></corDosOlhos>
                        
                        <grauInstrucao></grauInstrucao>
                        
                        <cns></cns>
                        
                        <dataInicioPeriodoAquisitivo></dataInicioPeriodoAquisitivo>
                        
                        <dataFimPeriodoAquisitivo></dataFimPeriodoAquisitivo>
                        
                        <codigoRh></codigoRh>
                        
                        <desconsiderarEsocial></desconsiderarEsocial>
                        
                        <codigoGenero></codigoGenero>
                        
                        <dataValidadeRg></dataValidadeRg>
                    </funcionarioWsVo>
                    
                    <identificacaoWsVo>
                    
                    <chaveAcesso>${ pass }</chaveAcesso>
                    
                    <codigoEmpresaPrincipal>16459</codigoEmpresaPrincipal>
                    
                    <codigoResponsavel>6217</codigoResponsavel>
                    <homologacao>?</homologacao>
                    
                    <codigoUsuario>1591737</codigoUsuario>
                    </identificacaoWsVo>
                    
                    <naoImportarFuncionarioSemHierarquia></naoImportarFuncionarioSemHierarquia>
                    
                    <setorWsVo>
                        <codigo>${agendamento.funcionario.codSetor}</codigo>
                        <codigoRh></codigoRh>
                        <nome>${agendamento.funcionario.setor}</nome>
                        <observacaoAso></observacaoAso>
                        <status>ATIVO</status>
                        <tipoBusca>CODIGO</tipoBusca>
                        <criarHistoricoDescricao></criarHistoricoDescricao>
                    </setorWsVo>
                    
                    
                    <unidadeContratanteWsVo>
                    
                        <bairro></bairro>
                        
                        <bairroCobranca></bairroCobranca>
                        
                        <cep></cep>
                        
                        <cepCobranca></cepCobranca>
                        
                        <cidade></cidade>
                        
                        <cidadeCobranca></cidadeCobranca>
                        
                        <cnpj_cei></cnpj_cei>
                        
                        <codigo>${agendamento.funcionario.codUnidade}</codigo>
                        
                        <codigoArquivo></codigoArquivo>
                        
                        <codigoCnae></codigoCnae>
                        
                        <codigoCnpjCei></codigoCnpjCei>
                        
                        <codigoMunicipio></codigoMunicipio>
                        
                        <codigoMunicipioCobranca></codigoMunicipioCobranca>
                        
                        <codigoRh></codigoRh>
                        
                        <complemento></complemento>
                        
                        <complementoCobranca></complementoCobranca>
                        
                        <dataAssinaturaContrato></dataAssinaturaContrato>
                        
                        <descricaoCnae></descricaoCnae>
                        
                        <endereco></endereco>
                        
                        <enderecoCobranca></enderecoCobranca>
                        
                        <estado></estado>
                        
                        <estadoCobranca></estadoCobranca>
                        
                        <grauRisco></grauRisco>
                        
                        <inscricaoEstadual></inscricaoEstadual>
                        
                        <inscricaoMunicipal></inscricaoMunicipal>
                        
                        <nome></nome>
                        
                        <numero></numero>
                        
                        <numeroCobranca></numeroCobranca>
                        
                        <observacaoASO></observacaoASO>
                        
                        <observacaoContrato></observacaoContrato>
                        
                        <observacaoPPP></observacaoPPP>
                        
                        <percentualCalculoBrigada></percentualCalculoBrigada>
                        
                        <razaoSocial></razaoSocial>
                        
                        <status></status>
                        
                        <telefoneCat></telefoneCat>
                        
                        <tipoBusca>CODIGO</tipoBusca>
                        
                        <tipoCnae></tipoCnae>
                        
                        <unidadeContratante></unidadeContratante>
                        
                        <codigoCpf></codigoCpf>
                        
                        <codigoCaepf></codigoCaepf>
                        
                        <caracterizacaoProcessosAmbientesTrabalho></caracterizacaoProcessosAmbientesTrabalho>
                        
                        <codigoCno></codigoCno>
                    </unidadeContratanteWsVo>
                    
                    <unidadeWsVo>
                    
                        <bairro></bairro>
                        <bairroCobranca></bairroCobranca>
                        <cep></cep>
                        <cepCobranca></cepCobranca>
                        <cidade></cidade>
                        <cidadeCobranca></cidadeCobranca>
                        <cnpj_cei></cnpj_cei>
                        <codigo>${agendamento.funcionario.codUnidade}</codigo>
                        <codigoArquivo></codigoArquivo>
                        <codigoCnae></codigoCnae>
                        <codigoCnpjCei></codigoCnpjCei>
                        <codigoMunicipio></codigoMunicipio>
                        <codigoMunicipioCobranca></codigoMunicipioCobranca>
                        <codigoRh></codigoRh>
                        <complemento></complemento>
                        <complementoCobranca></complementoCobranca>
                        <dataAssinaturaContrato></dataAssinaturaContrato>
                        <descricaoCnae></descricaoCnae>
                        <endereco></endereco>
                        <enderecoCobranca></enderecoCobranca>
                        <estado></estado>
                        <estadoCobranca></estadoCobranca>
                        <grauRisco></grauRisco>
                        <inscricaoEstadual></inscricaoEstadual>
                        <inscricaoMunicipal></inscricaoMunicipal>
                        <nome>${agendamento.funcionario.unidade}</nome>
                        <numero></numero>
                        <numeroCobranca></numeroCobranca>
                        <observacaoASO></observacaoASO>
                        <observacaoContrato></observacaoContrato>
                        <observacaoPPP></observacaoPPP>
                        <percentualCalculoBrigada></percentualCalculoBrigada>
                        <razaoSocial></razaoSocial>
                        <status></status>
                        <telefoneCat></telefoneCat>
                        <tipoBusca>CODIGO</tipoBusca>
                        <tipoCnae></tipoCnae>
                        <unidadeContratante></unidadeContratante>
                        <codigoCpf></codigoCpf>
                        <codigoCaepf></codigoCaepf>
                        <caracterizacaoProcessosAmbientesTrabalho></caracterizacaoProcessosAmbientesTrabalho>
                        <codigoCno></codigoCno>
                    </unidadeWsVo>

                    <transferirFuncionario></transferirFuncionario>
                    
                    <transferencia>
                    <copiaFichaClinica></copiaFichaClinica>
                    
                    <tipoFichaCopia>
                        <acidente></acidente>
                        <admissional></admissional>
                        <avaliacaoFisica></avaliacaoFisica>
                        <checkup></checkup>
                        <consulta></consulta>
                        <consultaAssist></consultaAssist>
                        <demissional></demissional>
                        <enfermagem></enfermagem>
                        <especial></especial>
                        <licencaMedica></licencaMedica>
                        <mudancaFuncao></mudancaFuncao>
                        <periodico></periodico>
                        <qualidadeVida></qualidadeVida>
                        <retornoConsulta></retornoConsulta>
                        <retornoTrabalho></retornoTrabalho>
                        <terceiros></terceiros>
                    </tipoFichaCopia>
                    <copiaSocGed></copiaSocGed>
                    <valorizarExamesNaoCobradoNoDestino></valorizarExamesNaoCobradoNoDestino>
                    
                    <dataTransferencia></dataTransferencia>
                    <copiaHistoricoLaboral></copiaHistoricoLaboral>
                    
                    <esocial></esocial>
                    <copiaCadastroMedico></copiaCadastroMedico>
                    <copiaHistoricoVacinas></copiaHistoricoVacinas>
                    </transferencia>
                </Funcionario>
            </ser:importacaoFuncionario>


        </soapenv:Body>
        </soapenv:Envelope>
        `

        
        
    axios.post(URL, xml, {
        headers: { 
            'Content-Type': 'text/xml',
        }
    })
    .then(response => {

        return console.log('SOAP ASO:', response.status);
    })
    .catch(error => {
        return console.error('SOAP Error ASO:', error);
    });
}

module.exports = xmlFuncionarioModelo2