import { Request, Response } from 'express'
import fetch from 'cross-fetch'
import { Irelays } from '../types/Irelays'
import Ip from '../model/Ip'

//Primeiro endpoint: GET todos os IPs TOR
export const todos = async (req: Request, res: Response) => {

  //ambas listas de ips das duas fontes
  let ips1: string[] = []
  let ips2: string[] = []

  //onionoo
  try {
    const response1 = await fetch('https://onionoo.torproject.org/summary?limit=5000')
    const json = await response1.json()

    //extraindo o relays da api do onionoo (json 1) pra poder usar o metodo map
    const relays: Irelays[] = json.relays
    const ipsAMais: string[] = []

    //rodando map e apenas pegando as ips
    let ips = relays.map(relay => {
      //Aqui, como percebi que na api do onionoo, havia objetos relay que tinham mais de 1 ip por algum motivo, eu já peguei do terceiro elemento em diante, já que o segundo não parece ser um ip e sim um endereço mac
      if (relay.a[2]) {
        for (let i = 2; i < relay.a.length; i++) {
          ipsAMais.push(relay.a[i])
        }
      }
      return relay.a[0]
    })
    ips1 = [...ips, ...ipsAMais]
  } catch (e) { console.error(e) }

  //dan.me.uk
  try {
    const response2 = await fetch('https://www.dan.me.uk/torlist/')
    const txt = await response2.text()

    console.log(txt);

    //convertendo de string em array e pegando apenas ips
    ips2 = txt.split('\n').filter(ip => ip.length < 20 && ip.length != 0)
  } catch (e) { console.error(e) }

  res.json([...ips1, ...ips2])
}

//Segundo endpoint: POST com exceções de ips
export const adicionar = async (req: Request, res: Response) => {
  const ip: string = req.body.ip

  let newIpException = new Ip()
  newIpException.ip = req.body.ip

  try {
    await newIpException.save()
    console.log('Exceção adicionada com suceso.')
    res.json({})
  } catch (err) {
    console.log(err)
  }
}

//Terceiro endpoint: GET todos IPs EXCETO as excecoes do DB
export const todosFiltrado = async (req: Request, res: Response) => {
  const result = await Ip.find({})
  const exceptions = result.map(obj => obj.ip)

  let ips1: string[] = []
  let ips2: string[] = []

  //onionoo
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
  } catch (e) { console.error(e) }

  //dan.me.uk
  try {
    const response2 = await fetch('https://www.dan.me.uk/torlist/')
    const txt = await response2.text()
    ips2 = txt.split('\n').filter(ip => ip.length < 20 && ip.length != 0)
  } catch (e) { console.error(e) }

  const totalIps = [...ips1, ...ips2]
  for (let i = 0; i < exceptions.length; i++) {
    totalIps.includes(exceptions[i]) ? totalIps.splice(totalIps.indexOf(exceptions[i]), 1) : ''
  }

  res.json(totalIps)
}

//precisa refatorar e tornar tudo em ingles
