export const Intro = () => {
  return (
    <div className='container bg-white mt-10 p-10 mx-auto'>
      <h2 className='text-2xl font-medium'>O que eu posso te oferecer?</h2>
      <p>
        Aqui você pode acessar a lista de IPs Tor diretamente de fontes confiáveis. A fim de evitar bloqueio, a lista só será atualizada a cada 30 minutos. Ah! eu também consigo excluir algum IP específico que você não quer que faça parte da sua lista.<br />
        <strong>Lembrando:</strong> Só há uma atualização completa da lista a cada 30 minutos, antes disso será emitido a você uma lista que foi atualizada a pelo menos 30 minutos atrás.<br />
        Botões <span className='text-blue-700'>azuis</span> indicam uma lista disponível<br />
        Botões <span className='text-green-700'>verdes</span> indicam uma nova atualização
      </p>
    </div>
  )
}
