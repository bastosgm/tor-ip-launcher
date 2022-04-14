export const Header = () => {
  return (
    <header className='bg-black'>
      <nav className='max-w-3xl mx-auto flex flex-wrap justify-between text-white text-center p-3'>
        <a href='http://localhost:3001' className='text-2xl'>IPs Tor API <span className='text-gray-500 text-sm'>1.2.0</span> </a>
        <div className='text-xl'>
          <a href='http://localhost:5555/doc' className='mr-5'>Docs</a>
          <a href='https://github.com/bastosgm/IPs-Tor-API'>Github</a>
        </div>
      </nav>
    </header>
  )
}
