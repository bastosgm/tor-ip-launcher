import { IHandleExc } from '../types/IHandleExc'

export const Exception = ({ onChange, exc, setMessage }: IHandleExc) => {

  //Adicionando excecao
  const handleExc = () => {
    fetch('http://localhost:5555/api/add-exception', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exc)
    })
      .then(r => r.json())
      .then(json => json.Error ? setMessage('IP inválido ou já existente') : setMessage('Exceção adicionada'))
  }

  return (
    <div className='mt-10 py-2'>
      {/* Botao excecao */}
      <button className="bg-red-700 hover:bg-red-800 text-white rounded-md py-2 px-8 mr-4" onClick={handleExc}>
        Adicionar exceção
      </button>

      {/* Campo excecao */}
      <input type="text" className='rounded-md h-10 w-9/12 px-3 border-2 hover:border-red-700 focus:outline-none focus:border-red-700' placeholder='ex: 0.0.0.0' onChange={onChange} />
    </div>
  )
}
