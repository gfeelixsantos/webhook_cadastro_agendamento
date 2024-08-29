import { listaEmpresasKit } from "./empresasKit/empresasKit"



export const Core = {
    empresasKitAtendimento(agendamento){
        const result = listaEmpresasKit.includes(agendamento.cnpj)
        if (result) {
            agendamento.mensagem = 'KIT Atendimento.'
        }
    }
}