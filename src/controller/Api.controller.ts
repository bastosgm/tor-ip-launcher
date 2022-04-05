import { Request, Response } from 'express'
import fetch from 'cross-fetch'
import { Irelays } from '../types/Irelays'
import Ip from '../model/Ip'

//Primeiro endpoint: GET todos os IPs TOR
export const todos = async (req: Request, res: Response) => {

  //ambas listas de ips das duas fontes
  let ips1: string[] = []
  let ips2: string[] = []
  let txtTeste = '100.12.87.114 100.14.174.187 100.34.61.24 100.40.215.157 101.100.141.137 101.174.32.158'

  //onionoo
  try {
    const response1 = await fetch('https://onionoo.torproject.org/summary?limit=5000')
    const json = await response1.json()

    //extraindo o relays da api do onionoo (json 1) pra poder usar o metodo map
    const relays: Irelays[] = json.relays
    const ipsAMais: string[] = []

    //rodando map e apenas pegando as ips
    let ips = relays.map((relay) => {
      //Aqui, como percebi que na api do onionoo, havia objetos relay que tinham mais de 1 ip por algum motivo, eu já peguei do terceiro elemento em diante, já que o segundo não parece ser um ip e sim um endereço mac
      if (relay.a[2]) {
        for (let i = 2; i < relay.a.length; i++) {
          ipsAMais.push(relay.a[i])
        }
      }
      return relay.a[0]
    })
    ips1 = [...ips, ...ipsAMais]
    // console.log(ipsAMais.length)
  } catch (e) { console.error(e) }

  //dan.me.uk
  try {
    const response2 = await fetch('https://www.dan.me.uk/torlist/')
    const txt = await response2.text()

    console.log(txt);

    //convertendo de string em array e pegando apenas ips
    ips2 = txt.split('\n').filter(ip => ip.length < 20 && ip.length != 0)
  } catch (e) { console.error(e) }

  console.log(ips1.length, ips2.length)
  var totalIps = [...ips1, ...ips2]

  res.json(totalIps)
}

//Segundo endpoint: POST com excessoes de ips
export const add = async (req: Request, res: Response) => {
  const ip: string = req.body.ip

  let newIpException = new Ip()
  newIpException.ip = req.body.ip

  try {
    await newIpException.save()
    console.log('Exception has been added.')
    res.json({})
  } catch (err) {
    console.log(err)
  }
}
