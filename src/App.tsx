import { Routes, Route, useNavigate, useLocation } from "react-router-dom"

import { useEffect } from "react"
import { useTypedSelector } from "./redux/redux.type"

import Signup from "./components/Auth/Signup/Signup"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Login from "./components/Auth/Login/Login"

import RequireAuth from "./components/Auth/RequireAuth/RequireAuth";

import About from "./pages/About/About"
import Terms_of_use from "./pages/TermsOfUse/TermsOfUse"
import Home from "./pages/Home/Home"
import MoviePage from "./pages/Movie/MoviePage"
import Privacy from "./pages/Privacy/Privacy"
import ContactUs from "./pages/ContactUs/ContactUs"
import AllMoviesPage from "./pages/AllMoviesPage/AllMoviesPage"
import { useDispatch } from "react-redux"
import Favoris from "./pages/Favoris/Favoris"
import Genre from "./pages/Genres/Genre"
import MonCompte from "./pages/MyAccount/MyAccount"

function App() {

  const location = useLocation();
  const dispatch = useDispatch();

  const user = useTypedSelector(state => state.user);

  useEffect(() => {
    if (user.logged) dispatch({ type: 'FETCH_FAVORITES' });
  }, [])

  return (
    <>
      <div className="bg-primary-bg text-primary-text w-full">

        {/* Don't show Nav when login or signup */}
        {(location.pathname !== '/connexion' && location.pathname !== '/enregistrement') ? <Header /> : null}

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parcourir" element={<Home />} />
            <Route path="/parcourir/films" element={<AllMoviesPage />} />
            <Route path="/parcourir/genres" element={<Genre />} />

            <Route path="/connexion" element={<Login />} />
            <Route path="/enregistrement" element={<Signup />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/protection-donnees" element={<Privacy />} />
            <Route path="/termes-utilisation" element={<Terms_of_use />} />
            <Route path="/nous-contacter" element={<ContactUs />} />

            <Route path="/mon-compte" element={
              <RequireAuth>
                <MonCompte />
              </RequireAuth>
            } />

            <Route path="/mon-compte/:option" element={
              <RequireAuth>
                <MonCompte />
              </RequireAuth>
            } />

            <Route path="/mes-favoris" element={
              <RequireAuth>
                <Favoris />
              </RequireAuth>
            } />

            {/* <Route path="/chercher" element={<div>Home</div>} /> */}

            <Route path="/parcourir/films/:movie_id" element={
              <RequireAuth>
                <MoviePage />
              </RequireAuth>
            } />

            {/* <Route path="/parcourir/populaires" element={<div>Home</div>} /> */}

          </Routes>
        </main>

        {(location.pathname !== '/connexion' && location.pathname !== '/enregistrement') ? <Footer /> : null}

      </div>
    </>
  )
}

export default App
