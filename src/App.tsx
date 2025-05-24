import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import About from "./pages/About/About"
import Terms_of_use from "./pages/TermsOfUse/TermsOfUse"
import { useUser } from "@clerk/clerk-react"
import Login from "./components/Auth/Login/Login"
import { useEffect } from "react"
import Signup from "./components/Auth/Signup/Signup"

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) navigate("/login");
  }, [isLoaded, navigate, user])

  return (
    <>
      <div className="bg-primary-bg text-primary-text pl-12 w-full">

        {/* Don't show Nav when login or signup */}
        {(location.pathname !== '/login' && location.pathname !== '/signup') ? <Header /> : null}

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-account" element={<div>Home</div>} />
            <Route path="/my-favorites" element={<div>Home</div>} />
            <Route path="/search" element={<div>Home</div>} />
            <Route path="/browse/movies" element={<div>Home</div>} />
            <Route path="/browse/movies/:movie_slug" element={<div>Home</div>} />
            <Route path="/browse/genre" element={<div>Home</div>} />
            <Route path="/browse/popular" element={<div>Home</div>} />
            <Route path="/my-list" element={<div>Home</div>} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<div>Privacy</div>} />
            <Route path="/terms-of-use" element={<Terms_of_use />} />
            <Route path="/contact-us" element={<div>Contact</div>} />
          </Routes>
        </main>

        {(location.pathname !== '/login' && location.pathname !== '/signup') ? <Footer /> : null}

      </div>
    </>
  )
}

export default App
