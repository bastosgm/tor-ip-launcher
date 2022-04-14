import { IButtonZone } from '../types/IButtonZone'

export const ButtonZone = ({
  setList,
  setFilteredList,
  loading, setLoading,
  color, setColor,
  message, setMessage
}: IButtonZone) => {

  //Fetch de lista total
  const handleList = async () => {
    //Seta a lista oposta como vazia para entrar em condicao de exibir esta
    setFilteredList([])
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5555/api/ips-tor")
      const json = await response.json()
      setList(json)
      setMessage('Lista completa gerada!')
      setColor('bg-blue-700 hover:bg-blue-800')
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
      setMessage('Desculpe, acho que errei o caminho :(')
    }
  }

  //Fetch de lista filtrada
  const handleFilteredList = async () => {
    //Seta a lista oposta como vazia para entrar em condicao de exibir esta
    setList([])
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5555/api/ips-tor-with-exceptions")
      const json = await response.json()
      setList(json)
      setMessage('Lista filtrada gerada!')
      setColor('bg-blue-700 hover:bg-blue-800')
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
      setMessage('Desculpe, acho que errei o caminho :(')
    }
  }

  return (
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
  )
}
