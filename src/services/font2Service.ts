import fetch from 'cross-fetch'

const font2 = async () => {

  try {
    const response2 = await fetch('https://www.dan.me.uk/torlist/')
    const txt = await response2.text()

    //Convertendo de string para array e extraindo apenas IPs que não se repetem
    const ips2: string[] = txt.split('\n').filter(ip => ip.length < 16 && ip.length != 0)
    return ips2
  } catch (e) {
    console.error(e)
    return []
  }
}

export default font2
