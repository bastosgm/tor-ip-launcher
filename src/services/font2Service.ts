import fetch from 'cross-fetch'
import Font2 from '../model/Font2'
import { add, isAfter } from 'date-fns'
import { LocalStorage } from 'node-localstorage'

//Tera a funcao de puxar da fonte2, armazenar no BD e apenas atualizar os IPs adicionando e excluindo, de forma a deixar os IPs do banco = IPs da fonte2 naquele momento que houve atualizacao
const font2 = async () => {

  //Definindo localStorage
  const localStorage = new LocalStorage('./dates')
  let ipsFont2: string[] = []

  try {

    //Datas para comparacao
    const now = new Date(Date.now())
    const lastUpdate: Date = new Date(localStorage.getItem('lastUpdate') || '')

    //Se nao existir uma atualizacao anterior, cria nova e permite atualizacao da font2
    if (!localStorage.getItem('lastUpdate')) {
      localStorage.setItem('lastUpdate', now.toString())
      console.log('New lastUpdate was created in localStorage.')

      //Extraindo da fonte 2
      try {
        const response = await fetch('https://www.dan.me.uk/torlist/')
        const txt = await response.text()
        //'U' e a primeira letra da mensagem de timeout
        //Convertendo de string para array e extraindo apenas IPs que não se repetem
        if (typeof txt[0] === "number") {
          ipsFont2 = [...new Set(txt.split('\n').filter(ip => ip.length < 16 && ip.length != 0))]
        } else {
          console.log(`Still under timeout or server error`)
        }
      } catch (err) {
        console.error(err)
      }

      // else {
      //   console.log(`txt é do tipo number? ${typeof txt[0] === "number"}`)
      //   console.log(`retorno da font2: ${txt}`)
      // }
    }

    //Se passou de 30 minutos da ultima atualizacao, cria nova e permite atualizar a font2
    if (isAfter(now, add(lastUpdate, { minutes: 30 }))) {
      localStorage.setItem('lastUpdate', now.toString())
      console.log('New lastUpdate was created in localStorage.')
      console.log('font2 is able to update.')

      //Extraindo da fonte 2
      const response = await fetch('https://www.dan.me.uk/torlist/')
      const txt = await response.text()

      //'U' e a primeira letra da mensagem de timeout
      //Convertendo de string para array e extraindo apenas IPs que não se repetem
      if (typeof txt[0] === "number") {
        ipsFont2 = [...new Set(txt.split('\n').filter(ip => ip.length < 16 && ip.length != 0))]
      }
    } else {
      //Caso nao tenha passado de 30 min, usa a versao atual da lista no banco
      console.log('Could not update: font2 still under timeout.')
    }

    //Extraindo do banco para comparacoes
    let result = await Font2.find({})
    let ipsBanco: string[] = result.map(obj => obj.ip)

    //A cada loop e criado uma nova instancia, adicionando o IP e salvando no BD
    if (ipsFont2) {
      ipsFont2.map(async (ip) => {
        //Conferi se ja existe o IP da ipsFont2 no banco, caso nao, adiciona
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
    }

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
    }

    //Puxa todos itens salvos no bd atualizado e faz um array de ipsBanco
    result = await Font2.find({})
    ipsBanco = result.map(obj => obj.ip)

    return ipsBanco

  } catch (err) {
    console.error(err)
    return []
  }
}

export default font2
