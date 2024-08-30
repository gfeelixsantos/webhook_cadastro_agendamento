const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const Gemini = {
  buscaHierarquia: async function (agendamento, hierarquia) {
      
    const prompt = `Dada a seguinte hierarquia:
    ${JSON.stringify(hierarquia)}
    Retorne um json com o código da unidade, nome da unidade, código do setor, nome do setor, código do cargo e nome do cargo que seja similar para o funcionário com a unidade  ${agendamento.unidadeTrabalho} setor ${agendamento.setor} e cargo ${agendamento.cargo}?`
    
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

      return agendamento

    }
    else {
      // Não encontrou hierarquia....
      console.log(arrText, 'Não encontrou a hierarquia....');
    } 
  },




  buscaEmpresa: async function (agendamento, hierarquia) {
    const prompt = `Dada a seguinte hierarquia:
    ${JSON.stringify(hierarquia)}
    Retorne apenas um json com o código da empresa, cnpj e razão social, que seja idêntico ou se refere a empresa com a razao social  ${agendamento.empresa} e cnpj ${agendamento.cnpj}?`

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const arrText = responseText.split('"')

    agendamento.codEmpresa  = arrText[3]
    agendamento.empresa     = arrText[7]
    agendamento.cnpj        = arrText[11]
    
    return agendamento
    
  }
}

module.exports = Gemini