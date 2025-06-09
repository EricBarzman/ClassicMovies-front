import { useEffect } from 'react'

function About() {

  useEffect(() => {
    document.title = 'A propos | Classic Movies';
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="p-20">
      <h2 className="text-3xl font-bold mb-3">A propos</h2>
      <h3 className="text-xl mt-10 mb-10">Classic Movies, le meilleur ami du cinéphile !</h3>
      <p>Un service pour accéder aux meilleurs classiques du cinéma, en ligne. Retrouvez vos films favoris en quelques clics !</p>
      <br />
      <div className="ml-4">
        <p className="mt-10 mb-6">Conçu et programmé par <span className="font-bold">Eric Barzman</span></p>
      </div>
    </div>
  )
}

export default About