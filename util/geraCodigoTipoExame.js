function geraCodigoTipoExame(tipoExame) {

    if (tipoExame == 'ADMISSIONAL') return 1
    
    if (tipoExame == 'PERIÓDICO') return 2

    if (tipoExame == 'RETORNO AO TRABALHO') return 3

    if (tipoExame == 'MUDANÇA DE RISCO OCUPACIONAL') return 4

    if (tipoExame == 'DEMISSIONAL') return 5

    if (tipoExame == 'CLÍNICO GERAL / ASSISTENCIAL') return 10
    
    return atendimento
}

module.exports = geraCodigoTipoExame
