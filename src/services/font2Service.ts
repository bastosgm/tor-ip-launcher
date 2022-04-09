import fetch from 'cross-fetch'
import Font2 from '../model/Font2'

//Tera a funcao de puxar da fonte2, armazenar no BD, e apenas atualizar os IPs
const font2 = async () => {

  try {
    //Extraindo da fonte 2
    const response = await fetch('https://www.dan.me.uk/torlist/')
    const txt = await response.text()
    //Convertendo de string para array e extraindo apenas IPs que não se repetem
    const ipsFont2: string[] = txt.split('\n').filter(ip => ip.length < 16 && ip.length != 0)

    //Extraindo do banco para comparacoes
    let result = await Font2.find({})
    let ipsBanco: string[] = result.map(obj => obj.ip)

    //A cada loop e criado uma nova instancia, adicionando o IP e salvando no bd
    ipsFont2.map(async (ip) => {
      //Conferi se ja existe o IP da ipsBanco no banco, caso nao, adiciona
      if (!ipsBanco.includes(ip)) {
        const newFont2 = new Font2()
        newFont2.ip = ip
        try {
          await newFont2.save()
        } catch (err) {
          console.error(err)
        }
      }
    })

    //A cada loop exclui um ip da fonte2 conforme condicao
    ipsBanco.map(async (ip) => {
      //Conferi se existe o IP do banco na fonte2, caso nao, exclui
      if (!ipsFont2.includes(ip)) {
        try {
          await Font2.deleteOne({ ip })
        } catch (err) {
          console.error(err)
        }
      }
    })

    //Puxa todos itens salvos no bd atualizado e faz um array de ipsFont2
    result = await Font2.find({})
    ipsBanco = result.map(obj => obj.ip)

    return ipsBanco

    //Tambem ha a opcao de salvar uma string enorme, trazer ela pra ca e converter em um string[]
  } catch (e) {
    console.error(e)
    return []
  }
}

export default font2
