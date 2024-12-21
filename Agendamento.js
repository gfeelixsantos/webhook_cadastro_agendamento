class Agendamento {
    codEmpresa = ''
    codFuncionario = ''
    codTipoExame = 0
    codSequencial = ''
    riscos = []
    constructor(nome, cpf, dataNascimento, cnpj, data, horario, tipoExame, cargo, setor, solicitacaoAtividades, observacoes, perfil, razaoSocial, upload){
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
        this.perfil = perfil
        this.razaoSocial = razaoSocial
        this.upload = upload
    }
}

module.exports = Agendamento