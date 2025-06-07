import { useEffect } from 'react'

function About() {

  useEffect(() => {
    document.title = 'About | Classic Movies';
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="p-20">
      <h2 className="text-3xl font-bold mb-3">About</h2>
      <h3 className="text-xl mt-10 mb-10">Classic Movies, the cinephile's best friend!</h3>
      <p>A service to access classic movies online. Find your favorite movies in just a few clicks!</p>
      <br />
      <div className="ml-4">
        <p className="mt-10 mb-6">Designed by <span className="font-bold">Eric Barzman</span></p>
      </div>
    </div>
  )
}

export default About