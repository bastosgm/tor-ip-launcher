import { Request, Response } from 'express'
import fetch from 'cross-fetch'
import { Irelays } from '../types/Irelays'
import Ip from '../model/Ip'
import font1 from '../services/font1Service'
import font2 from '../services/font2Service'

//Primeiro endpoint: GET todos os IPs TOR
export const ipsTor = async (req: Request, res: Response) => {
  //Onionoo
  const ips1: string[] = await font1()

  //Dan.me.uk
  const ips2: string[] = await font2()

  const totalIps = [...new Set([...ips1, ...ips2])]
  res.json(totalIps)
}

//Segundo endpoint: POST - excecoes de IPs
export const addException = async (req: Request, res: Response) => {
  const newIpException = new Ip()
  newIpException.ip = req.body.ip
  if (newIpException.ip) {
    try {
      await newIpException.save()
      console.log('Exception has been added.')
      res.status(201).json(newIpException.ip)
    } catch (err) {
      console.error(err)
    }
  } else res.status(400).json({ Error: "Cannot be null." })
}

//Terceiro endpoint: GET - todos IPs EXCETO as excecoes do DB
export const filteredIpsTor = async (req: Request, res: Response) => {
  const result = await Ip.find({})
  const exceptions = result.map(obj => obj.ip)

  //Onionoo
  const ips1: string[] = await font1()

  //Dan.me.uk
  const ips2: string[] = await font2()

  const totalIps = [...new Set([...ips1, ...ips2])]
  console.log(`Total Ips without exceptions: ${totalIps.length}.`)

  for (let i = 0; i < exceptions.length; i++) {
    //Consulta as excecoes do banco e caso exista esse ip, a retira da lista
    totalIps.includes(exceptions[i]) ? totalIps.splice(totalIps.indexOf(exceptions[i]), 1) : ''
  }
  console.log(`Total Ips with exceptions: ${totalIps.length}.`)
  res.json(totalIps)
}
