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
    "dataNascimento":   String,
    "sexo":             String,
    "rg":               String,
    "cpf":              String,
    "cnpj":             String,
    "unidade":          String,
    "setor":            String,
    "cargo":            String,
    "dataFicha":        String,
    "tipoExame":        String,
    "unidade":          String,
    "realizados":       Number,
    "afazer":           Number,
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
                            }
                         }]
     },
    "observacoes":          String,
    "preferencial":         String,
    "atividadesEspeciais":  Array,
    "perfil":               String,
    "nomeSolicitante":      String,
    "emailSolicitante":     String,
    "telefoneSolicitante":  String,
    "anexos":               Array
}, {
    saveUnknown: true,
    timestamps: true
})

module.exports = dynamoose.model('agendamentos', Atendimento)