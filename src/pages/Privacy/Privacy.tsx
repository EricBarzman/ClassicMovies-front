import { useEffect } from 'react'

function Privacy() {

  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  return (
    <main className="p-20">
      <h2 className="text-3xl font-bold mb-3">Protection de la vie privée</h2>
      <h3 className="text-xl mt-10 mb-10">Classic Movies se préoccupe de vos données</h3>
      <p>Nous ne collectons rien. Ce site sert de portfolio, il n'a pas pour but l'accumulation de données à des fins commerciales.</p>
      <br />
      <div className="ml-4">
        <p className="mt-10 mb-6">Conçu et programmé par <span className="font-bold">Eric Barzman</span></p>
      </div>
    </main>
  )
}

export default Privacy