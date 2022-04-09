import { IRelays } from '../types/IRelays'
import fetch from 'cross-fetch'

const font1 = async () => {

  try {
    const response = await fetch('https://onionoo.torproject.org/summary?limit=5000')
    const json = await response.json()

    //Relays e o nome do objeto em que uma das props e a url
    //Extraindo o relays da api do onionoo pra poder usar o metodo map
    const relays: IRelays[] = json.relays
    const ips2: string[] = []

    //Rodando map e apenas pegando as ips
    let ips1 = relays.map(relay => {
      //Aqui, como percebi que na api do onionoo havia objetos relay que tinham mais de 1 IP por algum motivo, eu ja peguei do terceiro elemento em diante, ja que o segundo nao parece ser um IP e sim um endereco mac
      if (relay.a[2]) {
        for (let i = 2; i < relay.a.length; i++) {
          ips2.push(relay.a[i])
        }
      }
      return relay.a[0]
    })
    const ips: string[] = [...ips1, ...ips2]
    return ips
  } catch (err) {
    console.error(err)
    return []
  }
}

export default font1
