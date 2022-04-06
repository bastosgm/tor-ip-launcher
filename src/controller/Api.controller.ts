import { Request, Response } from 'express'
import fetch from 'cross-fetch'
import { Irelays } from '../types/Irelays'
import Ip from '../model/Ip'

//Primeiro endpoint: GET todos os IPs TOR
export const ipsTor = async (req: Request, res: Response) => {

  //Ambas listas de IPs das duas fontes
  let ips1: string[] = []
  let ips2: string[] = []

  //Onionoo
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
    ips1 = [...ips, ...ipsAMais]
  } catch (err) { console.error(err) }

  //Dan.me.uk
  try {
    const response2 = await fetch('https://www.dan.me.uk/torlist/')
    const txt = await response2.text()

    //Convertendo de string para array e extraindo apenas IPs
    ips2 = txt.split('\n').filter(ip => ip.length < 20 && ip.length != 0)
  } catch (e) { console.error(e) }
  res.json([...ips1, ...ips2])
}

//Segundo endpoint: POST - excecoes de IPs
export const addException = async (req: Request, res: Response) => {
  let newIpException = new Ip()
  newIpException.ip = req.body.ip

  try {
    await newIpException.save()
    console.log('Exception has been added.')
    res.json({})
  } catch (err) {
    console.error(err)
  }
}

//Terceiro endpoint: GET - todos IPs EXCETO as excecoes do DB
export const filteredIpsTor = async (req: Request, res: Response) => {
  const result = await Ip.find({})
  const exceptions = result.map(obj => obj.ip)
  let ips1: string[] = []
  let ips2: string[] = []

  //Onionoo
  try {
    const response1 = await fetch('https://onionoo.torproject.org/summary?limit=5000')
    const json = await response1.json()
    const relays: Irelays[] = json.relays
    const ipsAMais: string[] = []

    let ips = relays.map(relay => {
      if (relay.a[2]) {
        for (let i = 2; i < relay.a.length; i++) {
          ipsAMais.push(relay.a[i])
        }
      }
      return relay.a[0]
    })
    ips1 = [...ips, ...ipsAMais]
    console.log(ips1.length)
  } catch (err) { console.error(err) }

  //Dan.me.uk
  try {
    const response2 = await fetch('https://www.dan.me.uk/torlist/')
    const txt = await response2.text()
    ips2 = txt.split('\n').filter(ip => ip.length < 16 && ip.length != 0)
    console.log(ips2.length)
  } catch (err) { console.error(err) }

  const totalIps = [...ips1, ...ips2]
  for (let i = 0; i < exceptions.length; i++) {
    //Consulta as excecoes do banco e caso exista esse ip, a retira da lista
    totalIps.includes(exceptions[i]) ? totalIps.splice(totalIps.indexOf(exceptions[i]), 1) : ''
  }
  res.json(totalIps)
}
