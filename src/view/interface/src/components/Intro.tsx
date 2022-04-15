export const Intro = () => {
  return (
    <div className='container bg-white mt-10 p-8 mx-auto'>
      <h2 className='text-2xl font-medium'>O que eu posso te oferecer?</h2><br />
      <p>
        Aqui você pode acessar a lista de IPs Tor diretamente de fontes confiáveis. A fim de evitar bloqueio, a lista só será atualizada a cada 30 minutos. Ah! eu também consigo excluir algum IP específico que você não quer que faça parte da sua lista.<br />
        <strong>Lembrando:</strong> Só há uma atualização completa da lista após o tempo determinado, antes disso será emitido a você uma atualização feita a pelo menos 30 minutos atrás.<br />
        - Botões <span className='text-blue-700'><strong>azuis</strong></span> indicam uma lista disponível<br />
        - Botões <span className='text-green-700'><strong>verdes</strong></span> indicam uma nova atualização
      </p>
    </div>
  )
}
