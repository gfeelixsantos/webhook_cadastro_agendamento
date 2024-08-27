class Agendamento {
    dataAgendamento = ''
    dataChegada = '-'
    horarioAgendamento = ''
    horarioChegada = ''
    observacoes = ''
    situacao = 'EM PREPARACAO'

    empresa = {
        cnpj: '',
        codEmpresa: '',
        razaoSocial: '',
    }

    funcionario = {
        codCargo: '',
        codFuncionario: '',
        codSetor: '',
        codUnidade: '',
        cpf: '',
        dataNascimento: '',
        nome: '',
        rg: '',
        setor: '',
        sexo: '',
        cargo: '',
        unidade: ''
    }
    exame = {
        codTipoExame: 0,
        codSequencial: '',
        realizados: 0,
        riscos: [],
        solicitacaoAtividades: '',
        tipoExame: '',
    }
    

    constructor(nome, cpf, dataNascimento, cnpj, data, horario, tipoExame, cargo, setor, rg, sexo, solicitacaoAtividades, observacoes){
        this.funcionario.nome = nome.toUpperCase()
        this.funcionario.cpf = cpf
        this.funcionario.dataNascimento = dataNascimento
        this.empresa.cnpj = cnpj
        this.dataAgendamento = data
        this.horarioAgendamento = horario

        this.exame.tipoExame = tipoExame
        this.funcionario.cargo = cargo.toUpperCase()
        this.funcionario.setor = setor.toUpperCase()
        this.funcionario.rg = rg
        this.funcionario.sexo = sexo
        this.exame.solicitacaoAtividades = solicitacaoAtividades
        this.observacoes = observacoes
    }
}

module.exports = Agendamento