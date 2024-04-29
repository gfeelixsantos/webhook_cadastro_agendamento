class Agendamento {
    constructor(nome, cpf, dataNascimento, cnpj, data, tipoExame, cargo, setor, rg, sexo, solicitacaoAtividades, observacoes){
        this.nome = nome
        this.cpf = cpf
        this.dataNascimento = dataNascimento
        this.cnpj = cnpj
        this.data = data
        this.tipoExame = tipoExame
        this.cargo = cargo
        this.setor = setor
        this.rg = rg
        this.sexo = sexo
        this.solicitacaoAtividades = solicitacaoAtividades
        this.observacoes = observacoes
    }
}

module.exports = Agendamento