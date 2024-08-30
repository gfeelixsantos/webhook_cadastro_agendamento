const Exames = {
    trabalhoEmAlturaOuEspacoConfinado: function (agendamento) {
        const examesSolicitados = [
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Avaliação Clínica Ocupacional (Anamnese e Exame físico) (Cód. eSocial - 0295)",
                "codigo":       "clinico",
            },
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Audiometria tonal ocupacional (Cód. eSocial - 0281)",
                "codigo":       "51.01.004-6",
            },
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Avaliação da acuidade visual (Cód. eSocial - 0296)",
                "codigo":       "50.01.001-8",
            },
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Glicemia (Cód. eSocial - 0658)",
                "codigo":       "28.01.097-3",
            },
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Avaliação Psicossocial (Cód. eSocial - 0300)",
                "codigo":       "225588",
            },
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "EEG de rotina (Cód. eSocial - 0536)",
                "codigo":       "22010017",
            }
        ]

        for (const solicitado of examesSolicitados){
            const check = agendamento.exames.find( ex => ex["codigo"] == solicitado["codigo"])
            if (!check){
                agendamento.exames.push(solicitado)
            }
        }

        return agendamento
    },

    vigilanciaSanitaria: function (agendamento) {
        const examesSolicitados = [
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Avaliação Clínica Ocupacional (Anamnese e Exame físico) (Cód. eSocial - 0295)",
                "codigo":       "clinico",
            },
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Parasitológico de fezes (Cód. eSocial - 0974)",
                "codigo":       "28030141",
            },
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Hemograma com contagem de plaquetas ou frações (eritrograma, leucograma, plaquetas) (Cód. eSocial - 0693)",
                "codigo":       "28.04.048-1",
            },
        ]

        for (const solicitado of examesSolicitados){
            const check = agendamento.exames.find( ex => ex["codigo"] == solicitado["codigo"])
            if (!check){
                agendamento.exames.push(solicitado)
            }
        }

        return agendamento
    },

    operarEmpilhadeira: function (agendamento) {
        const examesSolicitados = [
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Avaliação Clínica Ocupacional (Anamnese e Exame físico) (Cód. eSocial - 0295)",
                "codigo":       "clinico",
            },
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Audiometria tonal ocupacional (Cód. eSocial - 0281)",
                "codigo":       "51.01.004-6",
            },
            {
                "status":       "aguardando",
                "data":         agendamento.dataAgendamento,
                "sala":         "0",
                "finalizado":   "0",
                "espera":       0,
                "nome":         "Avaliação da acuidade visual (Cód. eSocial - 0296)",
                "codigo":       "50.01.001-8",
            },
        ]

        for (const solicitado of examesSolicitados){
            const check = agendamento.exames.find( ex => ex["codigo"] == solicitado["codigo"])
            if (!check){
                agendamento.exames.push(solicitado)
            }
        }

        return agendamento
    }
}


module.exports = Exames