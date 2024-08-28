const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = 'AIzaSyChomQ0R7qnxuOFmhssZg_xFpUFvK_p9hc'

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function checkSetorCargo(agendamento, hierarquia) {

    try {
      const prompt = `Dada a seguinte hierarquia:
      ${JSON.stringify(hierarquia)}
      Complete o texto com o código da unidade, nome da unidadem código do setor, nome do setor, código do cargo e nome do cargo mais indicado para o funcionário com setor "${agendamento.funcionario.setor}" e cargo "${agendamento.funcionario.cargo}?
      "CODIGOUNIDADE":_____,"NOMEUNIDADE":_____,"CODIGOSETOR":_______,"SETOR":__________,"CODIGOCARGO":____,"CARGO":_____ `
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      const jsonResult = JSON.parse( `{${responseText}}` )
      console.log(jsonResult)
      agendamento.funcionario.codUnidade = jsonResult['CODIGOUNIDADE']
      agendamento.funcionario.unidade = jsonResult['NOMEUNIDADE']

      agendamento.funcionario.codSetor = jsonResult['CODIGOSETOR']
      agendamento.funcionario.setor = jsonResult['SETOR']

      agendamento.funcionario.codCargo = jsonResult['CODIGOCARGO']
      agendamento.funcionario.cargo = jsonResult['CARGO']

      
      return agendamento
      
    } catch (error) {
       console.error('Erro ao encontrar unidade/setor/cargo (fn: checkSetorCargo)', error);
    }
  }

module.exports = checkSetorCargo