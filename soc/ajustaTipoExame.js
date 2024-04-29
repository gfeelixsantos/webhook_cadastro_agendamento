function ajustaTipoExameSoap(atendimento) {
    
    if (atendimento.tipoExame == 'PERIÓDICO'){ atendimento.tipoExame = 'PERIODICO' }

    if (atendimento.tipoExame == 'RETORNO AO TRABALHO'){ atendimento.tipoExame = 'RETORNO_TRABALHO' }

    if (atendimento.tipoExame == 'MUDANÇA DE RISCO OCUPACIONAL'){ atendimento.tipoExame = 'MUDANCA_FUNCAO' }

    if (atendimento.tipoExame == 'CLÍNICO GERAL / ASSISTENCIAL'){ atendimento.tipoExame = 'CONSULTA_ASSISTENCIAL' }
    
    return atendimento
}

module.exports = ajustaTipoExameSoap