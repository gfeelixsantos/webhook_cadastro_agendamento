function ajustaTipoExame(atendimento) {

    if (atendimento.exame.tipoExame == 'ADMISSIONAL'){ 
        
        atendimento.exame.codTipoExame = 1
    }
    
    if (atendimento.exame.tipoExame == 'PERIÓDICO'){ 
        
        atendimento.exame.tipoExame = 'PERIODICO' 
        atendimento.exame.codTipoExame = 2
    }

    if (atendimento.exame.tipoExame == 'RETORNO AO TRABALHO'){ 
        
        atendimento.exame.tipoExame = 'RETORNO_TRABALHO' 
        atendimento.exame.codTipoExame = 3
    }

    if (atendimento.exame.tipoExame == 'MUDANÇA DE RISCO OCUPACIONAL'){ 
        
        atendimento.exame.tipoExame = 'MUDANCA_FUNCAO' 
        atendimento.exame.codTipoExame = 4
    }

    if (atendimento.exame.tipoExame == 'DEMISSIONAL'){ 
        atendimento.exame.codTipoExame = 5
    }

    if (atendimento.exame.tipoExame == 'CLÍNICO GERAL / ASSISTENCIAL'){ 
        atendimento.exame.tipoExame = 'CONSULTA_ASSISTENCIAL' 
    }
    
    return atendimento
}

module.exports = ajustaTipoExame
