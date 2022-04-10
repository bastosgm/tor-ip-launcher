import fetch from 'cross-fetch'
import Font2 from '../model/Font2'
import { IRelays } from '../types/IRelays'

//Tera a funcao de puxar da fonte2, armazenar no BD e apenas atualizar os IPs adicionando e excluindo, de forma a deixar os IPs do banco = IPs da fonte naquele momento
const font2 = async () => {

  try {
    //Extraindo da fonte 2
    const response = await fetch('https://www.dan.me.uk/torlist/')
    const txt = await response.text()
    let ipsFont2: string[] = []
    //'U' e a primeira letra da mensagem de timeout
    //Convertendo de string para array e extraindo apenas IPs que não se repetem
    if (txt[0] !== 'U') {
      ipsFont2 = [...new Set(txt.split('\n').filter(ip => ip.length < 16 && ip.length != 0))]
    }

    //Extraindo do banco para comparacoes
    let result = await Font2.find({})
    let ipsBanco: string[] = result.map(obj => obj.ip)

    //A cada loop e criado uma nova instancia, adicionando o IP e salvando no BD
    ipsFont2.map(async (ip) => {
      //Conferi se ja existe o IP da ipsBanco no banco, caso nao, adiciona
      if (!ipsBanco.includes(ip)) {
        const newFont2 = new Font2()
        newFont2.ip = ip
        try {
          await newFont2.save()
          console.log(`${newFont2.ip} has been added.`)
        } catch (err) {
          console.error(err)
        }
      }
    })

    //Testa se nao e vazio pra que nao exclua o que tem salvo no BD
    if (ipsFont2.length >= 1) {
      ipsBanco.map(async (ip) => {
        //Conferi se existe o IP do banco na fonte2, caso nao, exclui
        if (!ipsFont2.includes(ip)) {
          try {
            await Font2.deleteOne({ ip })
            console.log(`${ip} has been deleted.`)
          } catch (err) {
            console.error(err)
          }
        }
      })

      //Puxa todos itens salvos no bd atualizado e faz um array de ipsBanco
      result = await Font2.find({})
      ipsBanco = result.map(obj => obj.ip)

      return ipsBanco
    } else {
      return []
    }
  } catch (err) {
    console.error(err)
    return []
  }
}

export default font2
