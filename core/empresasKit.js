const listaEmpresasKit = [
    '60.910.080/0001-44',   // ENGEMED SAÚDE OCUPACIONAL EIRELI
    '41.449.329/0001-11',   // PREVER SAÚDE E SEGURANÇA DO TRABALHO LTDA
]

function verificaAgendamentoKit(agendamento) {
    if(listaEmpresasKit.includes(agendamento.cnpj)){
        agendamento.situacao = 'KIT'
        agendamento.setor = 'GERAL'
        agendamento.cargo = 'GERAL'
    }

    return agendamento
}

module.exports = verificaAgendamentoKit