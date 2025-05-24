import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-12 px-4">
      {/* Boite */}
      <div className="text-sm md:w-1/2">
        
        {/* Links */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 justify-between mb-8">
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>

        {/* Copyright */}
        <div className="text-sm">2025 EricB/Muddy Moose, Inc.</div>
      </div>
    </footer>
  )
}