
async function listagemCompromissoFuncionario(agendamento) {

  const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"16459","codigo":"191452","chave":"51d4dd92f0ccb3b3a06a","tipoSaida":"json","codigoUsuarioAgenda":"","dataInicial":"${agendamento.dataAgendamento}","dataFinal":"${agendamento.dataAgendamento}","codigoEmpresaBusca":"${agendamento.codEmpresa}","codigosSubgrupoEmpresaBusca":"","dataInicioCriacaoCompromissoBusca":"","dataFimCriacaoCompromissoBusca":"","cpfFuncionarioBusca":"","matriculaFuncionarioBusca":"","codigoFuncionarioBusca":"${agendamento.codFuncionario}","situacaoAtentimentoBusca":"","codigosTipoCompromissoBusca":"","codigosCompromissoBusca":"","codigosAgendamentos":""}`;
    
  const response = await fetch(url);
  const responseBuff = await response.arrayBuffer();
  const registrosAgenda = new TextDecoder('iso-8859-1').decode(responseBuff);

  const arrRegistrosAgenda = JSON.parse(registrosAgenda);

  // False, considera que não esta na agenda e faz a inclusão.
  return arrRegistrosAgenda.length <= 0 ? false : true
  
}

module.exports = listagemCompromissoFuncionario

