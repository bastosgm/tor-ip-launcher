import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Iip } from './types/Iip'

const App = () => {

  //estados
  const [list, setList] = useState<string[]>([])
  const [exc, setExc] = useState<Iip>({ ip: '' })
  const [filteredList, setFilteredList] = useState<string[]>([])
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [color, setColor] = useState<string>('bg-green-700 hover:bg-green-800')

  // useEffect(() => {
  //   setTimeout(() => {
  //     setColor('bg-blue-700 hover:bg-blue-800')
  //     setDisable(false)
  //   }, now.setMinutes(30))
  // }, [])

  const handleList = async () => {
    setFilteredList([])
    setColor('bg-blue-700 hover:bg-blue-800')
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5555/api/ips-tor")
      const json = await response.json()
      setList(json)
      setMessage('Lista completa gerada!')
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
      setMessage('Desculpe, mas acho que houve algum erro')
    }
  }

  const handleFilteredList = async () => {
    setList([])
    setColor('bg-blue-700 hover:bg-blue-800')
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5555/api/ips-tor-with-exceptions")
      const json = await response.json()
      setList(json)
      setMessage('Lista filtrada gerada!')
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
      setMessage('Desculpe, mas acho que houve algum erro')
    }
  }

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
    <>
      <Header />
      <div className='max-w-4xl mx-auto mt-5 p-5'>
        <h1 className='container text-white text-5xl'>Espero ser útil pra você!</h1>
        <div className='container bg-white mt-10 p-10 mx-auto'>
          <h2 className='text-2xl font-medium'>O que eu posso te oferecer?</h2>
          <p>
            Aqui você pode acessar a lista de IPs Tor diretamente de fontes confiáveis. A fim de evitar bloqueio, a lista só será atualizada a cada 30 minutos. Ah! eu também consigo excluir algum IP específico que você não quer que faça parte da sua lista.<br />
            <strong>Lembrando:</strong> Só há uma atualização completa da lista a cada 30 minutos, antes disso será emitido a você uma lista que foi atualizada a pelo menos 30 minutos atrás.<br /> Botões <span className='text-green-700'>verdes</span> indicam uma nova atualização<br />
            Botões <span className='text-blue-700'>azuis</span> indicam uma lista 'antiga'
          </p>
        </div>
        <div className='mt-10 py-2'>
          <input type="submit" className="bg-red-700 hover:bg-red-800 text-white rounded-md py-2 px-8 mr-4" value="Adicionar exceção" onClick={handleExc} />
          <input type="text" className='rounded-md h-10 w-9/12 px-3 border-2 hover:border-red-700 focus:outline-none focus:border-red-700' placeholder='ex: 0.0.0.0' onChange={e => setExc({ ip: e.target.value })} />
        </div>

        <div className='container h-60 bg-white pt-7 pb-3 px-10 mx-auto'>
          <ul className='h-52 overflow-auto'>
            {!loading && list.length === 0 && filteredList.length === 0 && 'Nada por aqui...'}
            {loading && 'Carregando...'}
            {!loading && list.map(ip => <li>{ip}</li>)}
            {!loading && filteredList.map(ip => <li>{ip}</li>)}
          </ul>
        </div>
        <div className='bg-white px-4 py-2 mb-12 xl:mb-0'>
          {/* Gerar completa */}
          <button className={`${color} text-white rounded-md py-2 px-5 my-2 mr-4`} onClick={handleList}>
            Gerar completa
          </button>

          {/* Gerar filtrada */}
          <button className={`${color} text-white rounded-md py-2 px-5`} onClick={handleFilteredList}>
            Gerar filtrada
          </button>
          <span className='ml-5 text-black'>
            {!loading && message}
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
