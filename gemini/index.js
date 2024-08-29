const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function buscaHierarquia(agendamento, hierarquia) {
      
      const prompt = `Dada a seguinte hierarquia:
      ${JSON.stringify(hierarquia)}
      Complete o texto com o código da unidade, nome da unidade, código do setor, nome do setor, código do cargo e nome do cargo que seja idêntico ou se refere para o funcionário com a unidade  ${agendamento.unidadeTrabalho} setor ${agendamento.setor} e cargo ${agendamento.cargo}?
      Resposta:CODIGOUNIDADE:_:NOMEUNIDADE:_:CODIGOSETOR:_:SETOR:_:CODIGOCARGO:_:CARGO:_`
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      const arrText = responseText.split(':')
     
      console.log(arrText)

      if (arrText.length > 2){
        agendamento.codUnidadeTrabalho  = arrText[2]
        agendamento.unidadeTrabalho     = arrText[4]

        agendamento.codSetor            = arrText[6]
        agendamento.setor               = arrText[8]

        agendamento.codCargo            = arrText[10]
        agendamento.cargo               = arrText[12]

        return agendamento

      }
      else {

        // Não encontrou hierarquia....
        
      }
      
      
  }

module.exports = buscaHierarquia