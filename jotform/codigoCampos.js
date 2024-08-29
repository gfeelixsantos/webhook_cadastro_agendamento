const codigoCampos = {
    identificador: '947', // geração automática
    nomeFuncionario: '34', // trim
    razaoSocial: '519', // trim
    cnpj: '5', 
    dataAgendamento: '11', // prettyFormat: '02/09/2024'
    horarioAgendamento: '70',
    tipoExame: '12',
    unidade: '668', // pode vir undefined
    cargo: '35', // pode vir undefined
    setor: '36', // pode vir undefined
    rg: '38', // pode vir undefined
    sexo: '39', // pode vir undefined
    cpf: '40',  // Obrigatório
    solicitacaoAtividades: '42', // vigilância, altura, confinado, empilhadeira
    observacoes: '45', // pode vir undefined
    dataNascimento: '69', // Obrigatório - prettyFormat: '20/07/1988'
    nomeSolicitante: '47', // Obrigatório
    emailSolicitante: '48', // Obrigatório
    telefoneSolicitante: '49', // pode vir undefined - prettyFormat: '(19) 987364867'
    anexos: '792', // pode vir undefined
}

module.exports = codigoCampos