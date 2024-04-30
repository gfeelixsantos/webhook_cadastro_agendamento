function ajustaTipoExame(atendimento) {

    if (atendimento.tipoExame == 'ADMISSIONAL'){ 
        
        atendimento.codTipoExame = 1
    }
    
    if (atendimento.tipoExame == 'PERIÓDICO'){ 
        
        atendimento.tipoExame = 'PERIODICO' 
        atendimento.codTipoExame = 2
    }

    if (atendimento.tipoExame == 'RETORNO AO TRABALHO'){ 
        
        atendimento.tipoExame = 'RETORNO_TRABALHO' 
        atendimento.codTipoExame = 3
    }

    if (atendimento.tipoExame == 'MUDANÇA DE RISCO OCUPACIONAL'){ 
        
        atendimento.tipoExame = 'MUDANCA_FUNCAO' 
        atendimento.codTipoExame = 4
    }

    if (atendimento.tipoExame == 'DEMISSIONAL'){ 
        atendimento.codTipoExame = 5
    }

    if (atendimento.tipoExame == 'CLÍNICO GERAL / ASSISTENCIAL'){ 
        atendimento.tipoExame = 'CONSULTA_ASSISTENCIAL' 
    }
    
    return atendimento
}

module.exports = ajustaTipoExame
