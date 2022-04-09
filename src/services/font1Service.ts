import { Irelays } from '../types/Irelays'

const font1 = async () => {

  try {
    const response1 = await fetch('https://onionoo.torproject.org/summary?limit=5000')
    const json = await response1.json()

    //Relays e o nome do objeto em que uma das props e a url
    //Extraindo o relays da api do onionoo pra poder usar o metodo map
    const relays: Irelays[] = json.relays
    const ipsAMais: string[] = []

    //Rodando map e apenas pegando as ips
    let ips = relays.map(relay => {
      //Aqui, como percebi que na api do onionoo havia objetos relay que tinham mais de 1 IP por algum motivo, eu ja peguei do terceiro elemento em diante, ja que o segundo nao parece ser um IP e sim um endereco mac
      if (relay.a[2]) {
        for (let i = 2; i < relay.a.length; i++) {
          ipsAMais.push(relay.a[i])
        }
      }
      return relay.a[0]
    })
    const ips1: string[] = [...ips, ...ipsAMais]
    return ips1
  } catch (err) {
    console.error(err)
    return []
  }
}

export default font1
