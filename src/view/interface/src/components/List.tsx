import { IList } from '../types/IList'

export const List = ({ loading, list, filteredList }: IList) => {
  return (
    <div className='container h-60 bg-white pt-7 pb-3 px-10 mx-auto'>
      {/* Carregara abaixo apenas 1 dos 4 elementos por vez */}
      <ul className='h-52 overflow-auto'>
        {!loading && list.length === 0 && filteredList.length === 0 && 'Nada por aqui...'}
        {loading && 'Carregando...'}
        {!loading && list.map((ip, index) => <li key={index}>{ip}</li>)}
        {!loading && filteredList.map((ip, index) => <li key={index}>{ip}</li>)}
      </ul>
    </div>
  )
}
