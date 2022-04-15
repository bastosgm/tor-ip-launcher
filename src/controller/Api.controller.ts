import { Request, Response } from 'express'
import Exception from '../model/Exception'
import font1 from '../services/font1Service'
import font2 from '../services/font2Service'

//Primeiro endpoint: GET todos os IPs TOR
export const ipsTor = async (req: Request, res: Response) => {

  //Onionoo
  const ips1: string[] = await font1()
  console.log(`ips1: ${ips1.length}.`)

  //Dan.me.uk
  let ips2: string[] = await font2()
  console.log(`ips2: ${ips2.length}.`)

  const totalIps = [...ips1, ...ips2]
  console.log(`Total Ips: ${totalIps.length}.`)
  res.json(totalIps)
}

//Segundo endpoint: POST - excecoes de IPs
export const addException = async (req: Request, res: Response) => {
  const rgx = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  const newIpException = new Exception()
  newIpException.ip = req.body.ip
  const ipExists = await Exception.findOne({ ip: newIpException.ip })
  //se for de formato compativel com de um IP e ainda nao existir
  if (rgx.test(newIpException.ip) && !ipExists) {
    try {
      await newIpException.save()
      console.log(`Exception ${newIpException.ip} has been added.`)
      res.status(201).json(newIpException.ip)
    } catch (err) {
      console.error(err)
    }
  } else res.status(400).json({ Error: "Invalid or existing IP." })
}

//Terceiro endpoint: GET - todos IPs EXCETO as excecoes do DB
export const filteredIpsTor = async (req: Request, res: Response) => {
  const result = await Exception.find({})
  const exceptions = result.map(obj => obj.ip)

  //Onionoo
  const ips1: string[] = await font1()
  console.log(`ips1: ${ips1.length}.`)

  //Dan.me.uk
  const ips2: string[] = await font2()
  console.log(`ips2: ${ips2.length}.`)

  const totalIps = [...ips1, ...ips2]
  console.log(`Total IPs without exceptions: ${totalIps.length}.`)

  for (let i = 0; i < exceptions.length; i++) {
    //Consulta as excecoes do banco e caso exista esse IP, a retira da lista
    totalIps.includes(exceptions[i]) ? totalIps.splice(totalIps.indexOf(exceptions[i]), 1) : ''
  }
  console.log(`Total exceptions: ${exceptions.length}.`)
  console.log(`Total Ips with exceptions: ${totalIps.length}.`)
  res.json(totalIps)
}
