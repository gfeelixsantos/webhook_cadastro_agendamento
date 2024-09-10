const listaEmpresasKit = [
    '60.910.080/0001-44',   // ENGEMED SAÚDE OCUPACIONAL EIRELI
    '41.449.329/0001-11',   // PREVER SAÚDE E SEGURANÇA DO TRABALHO LTDA
    '71.322.150/0059-86',   // PREVER SAÚDE E SEGURANÇA DO TRABALHO LTDA
    '10.413.463/0001-39',   // CND 27 (DELTAMED SERVIÇOS E MEDICOS LTDA)
    '10.413.463/0003-09',   // CND 27 (DELTAMED SERVIÇOS E MEDICOS LTDA)
    '10.413.463/0008-05',   // CND 27 (DELTAMED SERVIÇOS E MEDICOS LTDA)
]

function verificaAgendamentoKit(agendamento) {
    if(listaEmpresasKit.includes(agendamento.cnpj)){
        agendamento.situacao = 'KIT'
        agendamento.setor = 'GERAL'
        agendamento.cargo = 'GERAL'
    }

    // Troca de CNPJ unidades Svaegnago
    if( agendamento.cnpj == '18.026.984/0001-45' ||
        agendamento.cnpj == '71.322.150/0052-00' ||
        agendamento.cnpj == '71.322.150/0074-15' ||
        agendamento.cnpj == '71.322.150/0042-38' ||
        agendamento.cnpj == '71.322.150/0051-29' ||
        agendamento.cnpj == '71.322.150/0059-86' ||
        agendamento.cnpj == '71.322.150/0058-03' 
    ){
        const finalCnpj = agendamento.cnpj.split('-')[1]
        agendamento.unidade = `savegnago loja ${finalCnpj}`
        agendamento.cnpj = '23.804.920/0001-68'
    }

    // Troca de CNPJ CND 27
    if( agendamento.cnpj == '10.413.463/0001-39' || 
        agendamento.cnpj == '10.413.463/0003-09' ||
        agendamento.cnpj == '10.413.463/0008-05'
    ){
        agendamento.cnpj = '10.578.903/0001-08'
    }

    return agendamento
}

module.exports = verificaAgendamentoKit