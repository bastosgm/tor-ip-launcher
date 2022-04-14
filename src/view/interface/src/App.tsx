import { useState, useEffect } from 'react'
import { isAfter, add } from 'date-fns'
import { Exception } from './components/Exception'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ButtonZone } from './components/ButtonZone'
import { Intro } from './components/Intro'
import { List } from './components/List'
import { Display } from './components/Display'
import { IIp } from './types/IIp'

const App = () => {

  //Estados
  const [list, setList] = useState<string[]>([])
  const [exc, setExc] = useState<IIp>({ ip: '' })
  const [filteredList, setFilteredList] = useState<string[]>([])
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [color, setColor] = useState<string>('bg-blue-700 hover:bg-blue-800')

  //vai checar ao carregar a pagina ou apos alteracao no message
  useEffect(() => {
    const now: Date = new Date(Date.now())
    let lastClick: Date = new Date(localStorage.getItem('lastClick') || '')

    //Simula uma primeira vez do usuario no app
    if (!localStorage.getItem('lastClick')) {
      localStorage.setItem('lastClick', now.toString())
      setColor('bg-green-700 hover:bg-green-800')
      console.log('New lastClick was created in localStorage.')
    }

    //Se passados 30 minutos do ultimo click registrado no localStorage
    if (isAfter(now, add(lastClick, { minutes: 30 }))) {
      setColor('bg-green-700 hover:bg-green-800')
      //Se um dos botoes de lista forem clicados
      if (message === 'Lista completa gerada!' || message === 'Lista filtrada gerada!') {
        localStorage.setItem('lastClick', now.toString())
        setColor('bg-blue-700 hover:bg-blue-800')
        console.log('New lastClick was created in localStorage.')
      }
    } else {
      //Se um dos botoes da lista forem clicados e nao passou os 30 min
      if (!message || message === 'Lista completa gerada!' || message === 'Lista filtrada gerada!') {
        console.log('Could not update: Still under 30 min.')
      }
    }
  }, [message]) //Monitora o message para atualizar a cor dos botoes

  return (
    <>
      <Header />
      <div className='max-w-4xl mx-auto mt-5 p-5'>
        <Display />
        <Intro />
        <Exception
          onChange={e => setExc({ ip: e.target.value })}
          exc={exc}
          setMessage={setMessage}
        />
        <List
          loading={loading}
          list={list}
          filteredList={filteredList}
        />
        <ButtonZone
          setList={setList}
          setFilteredList={setFilteredList}
          loading={loading}
          setLoading={setLoading}
          color={color}
          setColor={setColor}
          message={message}
          setMessage={setMessage}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
