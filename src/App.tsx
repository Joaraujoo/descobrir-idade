import { FormEvent ,useState,  } from "react"
import { ToastContainer, toast } from "react-toastify"

import "./App.css"

export default function App(){

  interface resultadoProps{
    nome: string,
    ano: number
  }

  const [inputNome, setInputNome] = useState("")
  const [inputData, setInputData] = useState("")
  const [resultado, setResultado] = useState<resultadoProps>()
  
  const anoAtual = new Date().getFullYear()

  function handleSubmit(e: FormEvent){
    e.preventDefault()



    if(!inputData || !inputNome.trim()){
      toast.error("Preencha todos os campos!")
      setInputNome("")
      setInputData("")
      return
    } 

    // Verifica se o nome contém números
    if (/\d/.test(inputNome)) {
      toast.error("O nome não pode conter números!");
      setInputNome("");
      return;
    }

    const numeral = Number(inputData)
    const resultadoData = anoAtual - numeral
    setResultado({
      nome: inputNome,
      ano: resultadoData
    })
    

    setInputNome("")
    setInputData("")
    
  }


  return(
    <div className="container">
      <h2 className="title">Descubra sua idade</h2>
      <form className="formulario" onSubmit={handleSubmit}>

          <label>Digite seu nome!</label>
          <input 
            type="text" 
            placeholder="Digite seu nome..."
            className="input"
            value={inputNome}
            onChange={(e) => setInputNome(e.target.value)}
          />

          <label className="label">Digite o ano que nasceu!</label>
          <input 
            type="number" 
            placeholder="Digite o ano do seu nascimento..."
            className="input"
            min={1950}
            max={anoAtual}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />

          <button className="button">Descobrir idade</button>
      </form>

      {resultado && (
        <section className="resultado">
          <p>{`${resultado.nome} você tem: ${resultado.ano} anos`}</p>
        </section>
      )}
       <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}