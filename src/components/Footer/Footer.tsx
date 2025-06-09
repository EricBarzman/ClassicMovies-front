import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-20 px-36">
      {/* Boite */}
      <div className="text-sm md:w-1/2">
        
        {/* Links */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 justify-between mb-8">
          <Link to="/a-propos">A propos</Link>
          <Link to="/protection-donnees">Protection des données</Link>
          <Link to="/termes-utilisation">Termes d'utilisation</Link>
          <Link to="/nous-contacter">Nous contacter</Link>
        </div>

        {/* Copyright */}
        <div className="text-sm">2025 EricB/Muddy Moose, Inc.</div>
      </div>
    </footer>
  )
}