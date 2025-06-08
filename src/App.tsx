import { Routes, Route, useNavigate, useLocation } from "react-router-dom"

import { useEffect } from "react"
import { useTypedSelector } from "./redux/redux.type"

import Signup from "./components/Auth/Signup/Signup"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Login from "./components/Auth/Login/Login"

import About from "./pages/About/About"
import Terms_of_use from "./pages/TermsOfUse/TermsOfUse"
import Home from "./pages/Home/Home"
import MoviePage from "./pages/Movie/MoviePage"
import Privacy from "./pages/Privacy/Privacy"
import ContactUs from "./pages/ContactUs/ContactUs"
import AllMoviesPage from "./pages/AllMoviesPage/AllMoviesPage"

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const user = useTypedSelector((state) => state.user);

  // Redirect to login
  useEffect(() => {
    if (!user.token || !user.logged) navigate("/login");
  }, [])

  return (
    <>
      <div className="bg-primary-bg text-primary-text w-full">

        {/* Don't show Nav when login or signup */}
        {(location.pathname !== '/login' && location.pathname !== '/signup') ? <Header /> : null}

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-account" element={<div>Home</div>} />
            <Route path="/my-favorites" element={<div>Home</div>} />
            <Route path="/search" element={<div>Home</div>} />
            <Route path="/browse/movies" element={<AllMoviesPage />} />
            <Route path="/browse/movies/:movie_id" element={<MoviePage />} />
            <Route path="/browse/genre" element={<div>Home</div>} />
            <Route path="/browse/popular" element={<div>Home</div>} />
            <Route path="/my-list" element={<div>Home</div>} />

            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms-of-use" element={<Terms_of_use />} />
            <Route path="/contact-us" element={<ContactUs />} />

          </Routes>
        </main>

        {(location.pathname !== '/login' && location.pathname !== '/signup') ? <Footer /> : null}

      </div>
    </>
  )
}

export default App
