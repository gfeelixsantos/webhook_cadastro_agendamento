const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const Gemini = {
  buscaHierarquia: async function (agendamento, hierarquia) {
      
    // const prompt = `Dada a seguinte hierarquia:
    // ${JSON.stringify(hierarquia)}
    // Retorne apenas um json com o código da unidade, nome da unidade, código do setor, nome do setor, código do cargo e nome do cargo que seja exato para o funcionário com a unidade  ${agendamento.unidadeTrabalho} setor ${agendamento.setor} e cargo ${agendamento.cargo} sendo todos os itens com a situação ATIVO_UNIDADE, ATIVO_SETOR e ATIVO_CARGO como "Sim" na hierarquia informada. Considere também nomenclaturas como JR, PL e SR.`

    const prompt = `Dada a seguinte hierarquia:
    ${JSON.stringify(hierarquia)}, encontre o cargo ${agendamento.cargo} ou relacione-o com o mais próximo possível, considerando o setor ${agendamento.setor} e unidade ${agendamento.unidadeTrabalho}. Retorne um json com o código da unidade, nome da unidade, código do setor, nome do setor, código do cargo e nome do cargo.`
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
  
    const arrText = responseText.split('"')
    
    if (arrText.length > 2){
      agendamento.codUnidadeTrabalho  = arrText[3]
      agendamento.unidadeTrabalho     = arrText[7]

      agendamento.codSetor            = arrText[11]
      agendamento.setor               = arrText[15]

      agendamento.codCargo            = arrText[19]
      agendamento.cargo               = arrText[23]

      if (arrText.length > 27){
        agendamento.observacoes = arrText.slice(30).reduce((acc,cc) => acc += cc)
      }
      
      // agendamento.observacoes = '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYelmU1ngMoEdungNoIbBcLlKmm9FghYkibw&s" width="50" /><strong style="color:red;font-size:18px">CONSULTAR UNIDADE, SETOR E CARGO COM AGENDAMENTO !</strong>'.toString()
      // agendamento.observacoes = 'CONSULTAR UNIDADE, SETOR E CARGO COM AGENDAMENTO'
      return agendamento

    }
    else {
      // Não encontrou hierarquia....
      console.error(arrText, 'Não encontrou a hierarquia....');
    } 
  },




  // buscaEmpresa: async function (agendamento, empresasAtivas) {
  //   const prompt = `Dada as seguintes empresas ativas:
  //   ${JSON.stringify(empresasAtivas)}
  //   Retorne apenas um json com o código da empresa, cnpj e razão social, que seja exato para este cnpj ${agendamento.cnpj}?`

  //   const result = await model.generateContent(prompt);
  //   const responseText = result.response.text();
  //   const arrText = responseText.split('"')
  //   console.log(arrText)
  //   agendamento.codEmpresa  = arrText[3]
  //   agendamento.cnpj        = arrText[7]
  //   agendamento.empresa     = arrText[11]
    
  //   return agendamento
    
  // }
}

module.exports = Gemini