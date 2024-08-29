const Atendimento = new dynamoose.Schema({
    "id":               String,
    "chegada":          String,
    "dataChegada":      String,
    "situacao":         String,
    "codEmpresa":       String,
    "empresa":          String,
    "codFuncionario":   String,
    "funcionario":      String,
    "cpf":              String,
    "cnpj":             String,
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
    "observacoes":      String,
    "preferencial":     String,
    "perfil":           String
}, {
    saveUnknown: true,
    timestamps: true
})