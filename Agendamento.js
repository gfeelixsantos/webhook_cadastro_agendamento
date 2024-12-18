class Agendamento {
    codEmpresa = ''
    codFuncionario = ''
    codTipoExame = 0
    codSequencial = ''
    riscos = []
    constructor(nome, cpf, dataNascimento, cnpj, data, horario, tipoExame, cargo, setor, solicitacaoAtividades, observacoes){
        this.nome = nome
        this.cpf = cpf
        this.dataNascimento = dataNascimento
        this.cnpj = cnpj
        this.data = data
        this.horario = horario
        this.tipoExame = tipoExame
        this.cargo = cargo
        this.setor = setor
        this.solicitacaoAtividades = solicitacaoAtividades
        this.observacoes = observacoes
    }
}

module.exports = Agendamento