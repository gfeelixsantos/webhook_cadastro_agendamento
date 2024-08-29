import { listaEmpresasKit } from "./empresasKit/empresasKit"



export const Core = {
    empresasKitAtendimento(agendamento){
        return listaEmpresasKit.includes( elm => elm == agendamento.cnpj)
    }
}