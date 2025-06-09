// React
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/features/user";
import { useTypedSelector } from "../../../redux/redux.type";


// UI
import { Button } from "@heroui/button";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

import { type FormDataProp } from "../../../types/auth.type";

import { useAuth } from "../../../firebase/auth";
import { useAvatars, useUsersCollection } from "../../../firebase/users/userHook";
import type { IAvatar, ISerializedUser } from "../../../types/user.type";

const defaultFormData: FormDataProp = {
  email: "",
  username: "",
  password: "",
  avatarId: null,
}

function Signup() {

  const navigate = useNavigate();
  const { signup } = useAuth();
  const { createUser } = useUsersCollection();
  const { getAvatars } = useAvatars();

  // Gestion d'erreur
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Formulaire
  const [formData, setFormData] = useState<FormDataProp>(defaultFormData);
  const [avatars, setAvatars] = useState<IAvatar[]>([]);

  // Redux
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.user);


  // Change le titre de la page, reset la form
  useEffect(() => {
    if (user.logged) navigate("/");
    document.title = `Connection | Classic Movies`;
    getAvatars().then(data => setAvatars(data));
    setFormData(defaultFormData);
    setIsSubmitting(false);
  }, [])

  // Changement du form
  function handleChange(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // Changement d'avatar
  function handleAvatarClick(e: any) {
    setFormData({
      ...formData,
      avatarId: Number(e.currentTarget.id)
    });
  }

  // Submit
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    // Gestion d'erreurs
    if (formData.email === '') {
      setAuthError('Vous devez entrer un mail');
      setIsSubmitting(false);
      return;
    }
    if (formData.username === '') {
      setAuthError("Vous devez entrer un nom d'utilisateur");
      setIsSubmitting(false);
      return;
    }
    if (formData.password.length < 8 || formData.password === '') {
      setAuthError('Le mot de passe doit faire 8 caractères de long.');
      setIsSubmitting(false);
      return;
    }
    if (formData.avatarId === null) {
      setAuthError('Vous avez oublié de choisir un avatar !');
      setIsSubmitting(false);
      return; 
    }

    try {
      // Signup in firebase auth
      const result = await signup(formData.email, formData.password);

      if (!result.user) {
        console.error("Sign up incomplete: ", result);
        setAuthError("Une erreur s'est produite. Réessayez.");
        setIsSubmitting(false);
      }

      // Create a user in firebase db
      const newUser = await createUser({
        email: formData.email,
        username: formData.username,
        avatar: avatars.find(avatar => avatar.avatarId === formData.avatarId),
        firebaseId: result.user.uid,
      })

      // Load info in redux
      dispatch(updateUser({
        email: result.user.email,
        token: await result.user.getIdToken(),
        username: newUser.username,
        avatar: newUser.avatar.get_image,
        userId: result.user.uid,
      }));
      dispatch({ type: 'FETCH_FAVORITES' });
      setIsSubmitting(false);
      navigate("/");


    } catch (error: any) {
      setAuthError(error.errors?.[0]?.message || "An error occured.")
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-12 md:w-3/4 mx-auto">

      <h2 className="md:text-4xl text-2xl mt-10 mb-10 text-center font-semibold uppercase">
        Créer votre profile
      </h2>

      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className='flex flex-col mx-auto md:w-1/3'>

          {authError && (
            <div className="mx-auto bg-red-800 text-red-600 p-4 roundeg-lg mb-12 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{authError}</p>
            </div>
          )}

          <input
            name="email"
            type="email"
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Votre email...'
            onChange={handleChange}
          />

          <input
            name="username"
            type="text"
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder="Votre nom d'utilisateur..."
            onChange={handleChange}
          />

          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Votre mot de passe...'
            onChange={handleChange}
          />

          <Button
            className="flex justify-end"
            isIconOnly
            variant="light"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-default-500" />
            ) : (
              <Eye className="h-4 w-4 text-default-500" />
            )}
          </Button>
        </div>

        <div className="flex md:flex-row flex-col">
          <h2>Choisir un avatar</h2>
          {avatars.map((avatar) => (
            <div
              id={avatar.avatarId.toString()}
              key={avatar.avatarId}
              onClick={handleAvatarClick}
              className={`m-4 p-2 hover:border-primary hover:border-1 ${formData.avatarId === avatar.avatarId ? 'border-primary border-2' : ''}`}
            >
              <img
                className="w-[250px] h-[120px]"
                src={`./avatars/${avatar.get_image}`}
                alt="avatar"
              />
            </div>
          ))}
        </div>

        <Button
          type='submit'
          isLoading={isSubmitting}
          className='mt-4 rounded-xl px-6 py-3 bg-teal-900 text-white hover:bg-teal-700 transition-all md:w-1/2'
        >
          {isSubmitting ? "En cours" : "Action !"}
        </Button>

      </form>

      <div className="text-gray-500 text-center mt-10">
        Vous avez déjà un compte ?
        <span className="underline text-white ml-4">
          <Link to="/connexion">Se connecter</Link>
        </span>
      </div>
    </div>
  )
}

export default Signup