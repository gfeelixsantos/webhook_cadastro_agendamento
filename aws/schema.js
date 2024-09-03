const dynamoose = require('dynamoose')

Atendimento = new dynamoose.Schema({
    "id":               String,
    "chegada":          String,
    "dataChegada":      String,
    "dataAgendamento":  String,
    "horarioAgendamento":String,
    "situacao":         String,
    "codEmpresa":       String,
    "empresa":          String,
    "codFuncionario":   String,
    "funcionario":      String,
    "situacaoFuncionario":String,
    "dataNascimento":   String,
    "sexo":             String,
    "rg":               String,
    "cpf":              String,
    "cnpj":             String,
    "unidade":          String,
    "setor":            String,
    "codSetor":         String,
    "cargo":            String,
    "codCargo":         String,
    "idFicha":          String,
    "dataFicha":        String,
    "codTipoExame":     Number,
    "tipoExame":        String,
    "unidadeTrabalho":  String,
    "codUnidadeTrabalho":String,
    "realizados":       Number,
    "afazer":           Number,
    "riscos":           { type: Array,
                        schema: [{
                            type: Object,
                            schema: {
                                "codRisco": String,
                                "risco": String,
                                }
                            }],
                        },
    "exames":           { type: Array,
                         schema: [{
                            type: Object,
                            schema: {
                                "status": String,
                                "data": String,
                                "sala": String,
                                "finalizado": String,
                                "espera": Number,
                                "nome": String,
                                "codigo": String,
                                "sequencialResultado": String
                            }
                         }]
     },
    "observacoes":          String,
    "preferencial":         String,
    "atividadesEspeciais":  Array, Object ,
    "perfil":               String,
    "nomeSolicitante":      String,
    "emailSolicitante":     String,
    "telefoneSolicitante":  String,
    "anexos":               Array,
    "erros":                Array,
}, {
    saveUnknown: true,
    timestamps: true
})

module.exports = dynamoose.model('agendamentos', Atendimento)