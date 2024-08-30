const Exame = require('../../util/examesAtividadesEspeciais')

async function examesFuncionario(agendamento) {

    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={"empresa":"${agendamento.codEmpresa}","codigo":"198101","chave":"3526cc61265b919aeaf3","tipoSaida":"json","tipoBusca":"1","codigoFuncionario":"${agendamento.codFuncionario}","tipoExame":"${agendamento.codTipoExame}"}`;
        
    const response = await fetch(url);
    const responseBuff = await response.arrayBuffer();
    const exames = new TextDecoder('iso-8859-1').decode(responseBuff);
    
    if (exames.length > 2){
        const arrExames = JSON.parse(exames)
        
        for (const exame of arrExames){
            agendamento.exames.push({
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         exame['NOME_EXAME'],
                "codigo":       exame['CODIGO_EXAME'],
            })
        }
        
    }

    else{
        // Sem exames sugeridos... realizar ao menos clínico
        agendamento.exames.push({
            "status":       "aguardando",
            "data":         agendamento.dataAgendamento,
            "sala":         "0",
            "finalizado":   "0",
            "espera":       0,
            "nome":         "Avaliação Clínica Ocupacional (Anamnese e Exame físico) (Cód. eSocial - 0295)",
            "codigo":       "clinico",
        })
    }

    if (agendamento.atividadesEspeciais.length > 0){
        for( const atividade of agendamento.atividadesEspeciais ){
            if (atividade == 'TRABALHO EM ALTURA (NR 35)' || atividade == 'TRABALHO EM ESPAÇO CONFINADO (NR 33)'){
                agendamento = Exame.trabalhoEmAlturaOuEspacoConfinado(agendamento)
            }
            if (atividade == 'MANIPULAÇÃO DE ALIMENTOS (VIGILÂNCIA)'){
                agendamento = Exame.vigilanciaSanitaria(agendamento)
            }
            if (atividade == 'OPERAR EMPILHADEIRA' || agendamento.cargo.includes('MOTORISTA')){
                agendamento = Exame.operarEmpilhadeira(agendamento)
            }
        }
    }
    
    return agendamento
    
}

module.exports = examesFuncionario