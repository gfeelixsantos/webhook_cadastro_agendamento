const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = 'AIzaSyChomQ0R7qnxuOFmhssZg_xFpUFvK_p9hc'

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function checkSetorCargo(agendamento, hierarquia) {

    try {
      const prompt = `Dada a seguinte hierarquia:
      ${JSON.stringify(hierarquia)}
      Complete o texto com o código da unidade, nome da unidade, código do setor, nome do setor, código do cargo e nome do cargo que seja idêntico ou se refere para o funcionário com a unidade  ${agendamento.funcionario.unidade} setor ${agendamento.funcionario.setor} e cargo ${agendamento.funcionario.cargo}?
      Resposta: CODIGOUNIDADE:_____:NOMEUNIDADE:____:CODIGOSETOR:_______:SETOR:__________:CODIGOCARGO:____:CARGO:_____ `
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      const arrText = responseText.split(':')
     
      console.log(arrText)
      if (arrText.length < 2){
        console.log('Erro não encontrou a hierarquia...')
      }
      else {
        agendamento.funcionario.codUnidade = arrText[2]
        agendamento.funcionario.unidade = arrText[4]

        agendamento.funcionario.codSetor = arrText[6]
        agendamento.funcionario.setor = arrText[8]

        agendamento.funcionario.codCargo = arrText[10]
        agendamento.funcionario.cargo = arrText[12]

      }
      
      return agendamento
      
    } catch (error) {
       console.error('Erro ao encontrar unidade/setor/cargo (fn: checkSetorCargo)', error);
    }
  }

module.exports = checkSetorCargo